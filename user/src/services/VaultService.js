import {
  doc,
  query,
  addDoc,
  getDocs,
  orderBy,
  updateDoc,
  collection,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "src/libs/firebase";
import { errorService } from "./ErrorService";
import { cryptoService } from "./CryptoService";

const sensitiveFields = ["name", "description"];

export const vaultService = {
  async createVault(pathData) {
    try {
      const { path, data, encryptionKey } = pathData;

      const vaultData = { ...data };
      for (const field of sensitiveFields) {
        if (vaultData[field]) {
          const fieldEncryptionResult = await cryptoService.encryptWithAes(
            vaultData[field],
            encryptionKey
          );
          if (fieldEncryptionResult.error)
            return { error: fieldEncryptionResult.error };

          const { encryptedData } = fieldEncryptionResult;

          vaultData[field] = encryptedData;
        }
      }
      const vaultsRef = collection(db, path);

      const savedVault = await addDoc(vaultsRef, {
        ...vaultData,
        timestamp: { createdAt: serverTimestamp() },
      });

      return { vaultId: savedVault.id };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseFirestoreError(error) };
    }
  },

  async readVaults(pathData) {
    try {
      const { path, decryptionKey } = pathData;

      const vaultsRef = collection(db, path);
      const vaultsSnap = await getDocs(
        query(vaultsRef, orderBy("timestamp.createdAt"))
      );

      const vaults = {};
      for (const docSnap of vaultsSnap.docs) {
        const { id } = docSnap;
        const vaultData = docSnap.data();

        for (const field of sensitiveFields) {
          if (vaultData[field]) {
            const fieldDecryptionResult = cryptoService.decryptWithAes(
              vaultData[field],
              decryptionKey
            );
            if (fieldDecryptionResult.error) continue;

            const { decryptedData } = fieldDecryptionResult;

            vaultData[field] = decryptedData;
          }
        }
        vaults[id] = vaultData;
      }

      return { vaults };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseFirestoreError(error) };
    }
  },

  async updateVault(pathData) {
    try {
      const { path, data, encryptionKey } = pathData;

      const vaultData = { ...data };
      for (const field of sensitiveFields) {
        if (vaultData[field]) {
          const fieldEncryptionResult = await cryptoService.encryptWithAes(
            vaultData[field],
            encryptionKey
          );
          if (fieldEncryptionResult.error)
            return { error: fieldEncryptionResult.error };

          const { encryptedData } = fieldEncryptionResult;

          vaultData[field] = encryptedData;
        }
      }
      const vaultRef = doc(db, path);
      await updateDoc(vaultRef, {
        ...vaultData,
      });

      return { success: true };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseFirestoreError(error) };
    }
  },

  async deleteVault(pathData) {
    try {
      const { path } = pathData;

      const vaultRef = doc(db, path);
      const itemsRef = collection(vaultRef, "items");
      const itemsSnap = await getDocs(itemsRef);

      const batch = writeBatch(db);

      itemsSnap.forEach((docSnap) => {
        batch.delete(docSnap.ref);
      });

      batch.delete(vaultRef);

      await batch.commit();

      return { success: true };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseFirestoreError(error) };
    }
  },
};
