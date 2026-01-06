import forge from "node-forge";
import {
  pbkdf2,
  constants,
  randomBytes,
  publicEncrypt,
  privateDecrypt,
  createCipheriv,
  createDecipheriv,
} from "crypto";
import { convertFileToBufferArray } from "src/helpers/file";

export const cryptoService = {
  generateRandomBytes(size) {
    return new Promise((resolve, reject) => {
      randomBytes(size, (error, buffer) => {
        if (error) reject(error);
        resolve(buffer);
      });
    });
  },

  pbkdf2Derive(data, salt, iterations, keylen, digest) {
    return new Promise((resolve, reject) => {
      pbkdf2(data, salt, iterations, keylen, digest, (error, derivedKey) => {
        if (error) reject(error);
        resolve(derivedKey);
      });
    });
  },

  generateRSAKeyPair() {
    const {
      pki: {
        rsa: { generateKeyPair },
        publicKeyToPem,
        privateKeyToPem,
      },
    } = forge;

    return new Promise((resolve, reject) => {
      generateKeyPair({ bits: 2048, workers: 2 }, (error, keypair) => {
        if (error) reject(error);

        const publicKey = publicKeyToPem(keypair.publicKey);
        const privateKey = privateKeyToPem(keypair.privateKey);
        resolve({ publicKey, privateKey });
      });
    });
  },

  async encryptWithAes(data, encryptedWith) {
    try {
      const iv = await cryptoService.generateRandomBytes(16);
      const cipher = createCipheriv(
        "aes-256-cbc",
        encryptedWith.slice(0, 32),
        iv
      );
      const encryptedSecret = Buffer.concat([
        iv,
        cipher.update(data),
        cipher.final(),
      ]);

      return { encryptedData: encryptedSecret.toString("hex") };
    } catch (error) {
      console.error(error);
      return { error: "Data encryption failed" };
    }
  },

  decryptWithAes(data, decryptedWith) {
    try {
      const dataAsArray = Uint8Array.from(Buffer.from(data, "hex"));
      const iv = dataAsArray.slice(0, 16);
      const decipher = createDecipheriv(
        "aes-256-cbc",
        decryptedWith.slice(0, 32),
        iv
      );
      const decryptedValue = Buffer.concat([
        decipher.update(dataAsArray.slice(16)),
        decipher.final(),
      ]);

      return { decryptedData: decryptedValue.toString() };
    } catch (error) {
      console.error(error);
      return { error: "Data decryption failed" };
    }
  },

  async encryptWithRsa(data, encryptedWith) {
    try {
      const bufferData = Buffer.from(data);

      const encryptedData = publicEncrypt(
        {
          key: encryptedWith,
          padding: constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        bufferData
      );

      return { encryptedData: encryptedData.toString("base64") };
    } catch (error) {
      console.error(error);
      return { error: "Data encryption failed" };
    }
  },

  async decryptWithRsa(data, decryptedWith) {
    try {
      const bufferEncryptedData = Buffer.from(data, "base64");

      const decryptedData = privateDecrypt(
        {
          key: decryptedWith,
          padding: constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        bufferEncryptedData
      );

      return { decryptedData: decryptedData.toString() };
    } catch (error) {
      console.error(error);
      return { error: "Data decryption failed" };
    }
  },

  async encryptFile(file, encryptedWith) {
    try {
      const salt = new Uint8Array(await cryptoService.generateRandomBytes(8));

      const importedSecretKey = await window.crypto.subtle.importKey(
        "raw",
        new TextEncoder("utf-8").encode(encryptedWith),
        { name: "PBKDF2" },
        false,
        ["deriveBits"]
      );
      const derivedBits = await window.crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          salt,
          iterations: 10000,
          hash: "SHA-256",
        },
        importedSecretKey,
        384
      );
      const buffer = new Uint8Array(derivedBits);

      const encodedKey = await window.crypto.subtle.importKey(
        "raw",
        buffer.slice(0, 32),
        { name: "AES-CBC", length: 256 },
        false,
        ["encrypt"]
      );
      const cipher = await window.crypto.subtle.encrypt(
        { name: "AES-CBC", iv: buffer.slice(32) },
        encodedKey,
        new Uint8Array(await convertFileToBufferArray(file))
      );
      const cipherArray = new Uint8Array(cipher);

      const result = new Uint8Array(cipherArray.length + 16);
      result.set(new TextEncoder("utf-8").encode("Salted__"));
      result.set(salt, 8);
      result.set(cipherArray, 16);

      return { encryptedFile: result };
    } catch (error) {
      console.error(error);
      return { error: "File encryption failed" };
    }
  },

  async decryptFile(file, decryptedWith) {
    try {
      const cipherArray = new Uint8Array(await convertFileToBufferArray(file));
      const salt = cipherArray.slice(8, 16);

      const importedSecretKey = await window.crypto.subtle.importKey(
        "raw",
        new TextEncoder("utf-8").encode(decryptedWith),
        { name: "PBKDF2" },
        false,
        ["deriveBits"]
      );
      const derivedBits = await window.crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          salt,
          iterations: 10000,
          hash: "SHA-256",
        },
        importedSecretKey,
        384
      );
      const buffer = new Uint8Array(derivedBits);

      const encodedKey = await window.crypto.subtle.importKey(
        "raw",
        buffer.slice(0, 32),
        { name: "AES-CBC", length: 256 },
        false,
        ["decrypt"]
      );
      const decipher = await window.crypto.subtle.decrypt(
        { name: "AES-CBC", iv: buffer.slice(32) },
        encodedKey,
        cipherArray.slice(16)
      );
      const result = new Uint8Array(decipher);

      return { decryptedFile: result };
    } catch (error) {
      console.error(error);
      return { error: "File decryption failed" };
    }
  },
};
