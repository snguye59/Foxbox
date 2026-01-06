import { cryptoService } from "./CryptoService";

export const keyService = {
  async createUserKeys(credential) {
    try {
      const { password, email } = credential;

      const masterKey = await keyService.getUserMasterKey(password, email);

      const secretKey = (await cryptoService.generateRandomBytes(64)).toString(
        "hex"
      );
      const secretKeyEncryptionResult = await cryptoService.encryptWithAes(
        secretKey,
        masterKey
      );
      if (secretKeyEncryptionResult.error)
        return { error: secretKeyEncryptionResult.error };

      const { encryptedData: encryptedSecretKey } = secretKeyEncryptionResult;

      const { publicKey, privateKey } = await cryptoService.generateRSAKeyPair(
        "rsa"
      );
      const privateKeyEncryptionResult = await cryptoService.encryptWithAes(
        privateKey,
        secretKey
      );
      if (privateKeyEncryptionResult.error)
        return { error: privateKeyEncryptionResult.error };

      const { encryptedData: encryptedPrivateKey } = privateKeyEncryptionResult;

      return {
        keys: { secretKey, publicKey, privateKey },
        encryptedKeys: {
          publicKey,
          encryptedSecretKey,
          encryptedPrivateKey,
        },
      };
    } catch (error) {
      console.error(error);
      return { error: "An error occurred during key creation" };
    }
  },

  async decryptUserKeys(credential, encryptedKeys) {
    try {
      const { password, email } = credential;

      const { encryptedSecretKey, publicKey, encryptedPrivateKey } =
        encryptedKeys;

      const masterKey = await keyService.getUserMasterKey(password, email);

      const secretKeyDecryptionResult = cryptoService.decryptWithAes(
        encryptedSecretKey,
        masterKey
      );
      if (secretKeyDecryptionResult.error)
        return { error: secretKeyDecryptionResult.error };

      const { decryptedData: secretKey } = secretKeyDecryptionResult;

      const privateKeyDecryptionResult = cryptoService.decryptWithAes(
        encryptedPrivateKey,
        secretKey
      );
      if (privateKeyDecryptionResult.error)
        return { error: privateKeyDecryptionResult.error };

      const { decryptedData: privateKey } = privateKeyDecryptionResult;

      return {
        publicKey,
        secretKey,
        privateKey,
      };
    } catch (error) {
      console.error(error);
      return { error: "An error occurred during key decryption" };
    }
  },

  async changeUserMasterKey(oldCredential, newCredential, encryptedKeys) {},

  async getUserMasterKey(secret, salt) {
    const masterKey = await cryptoService.pbkdf2Derive(
      secret,
      salt,
      100000,
      32,
      "sha256"
    );
    const stretched = await cryptoService.pbkdf2Derive(
      masterKey,
      salt,
      100000,
      64,
      "sha512"
    );
    return stretched;
  },
};
