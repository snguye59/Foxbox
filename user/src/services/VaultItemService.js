import {
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { db } from "src/libs/firebase";
import { errorService } from "./ErrorService";
import { cryptoService } from "./CryptoService";
import { getTimestamp } from "src/helpers/time";

const sensitiveFields = [
  "name",
  "notes",
  "website",
  "username",
  "password",
  "cardholder",
  "brand",
  "cardNumber",
  "cvv",
  "expirationDate",
  "title",
  "birthday",
  "firstName",
  "middleName",
  "lastName",
  "company",
  "ssn",
  "passportNumber",
  "licenseNumber",
  "email",
  "phoneNumber",
  "address1",
  "address2",
  "city",
  "state",
  "country",
  "zip",
  "tags",
];

export const vaultItemService = {
  async createItem(pathData) {
    try {
      const { path, data, encryptionKey } = pathData;

      const creationTime = getTimestamp();
      data.timestamps = {
        createdAt: creationTime,
        updatedAt: creationTime,
      };

      const itemData = { ...data };
      for (const field of sensitiveFields) {
        if (itemData[field]) {
          const fieldEncryptionResult = await cryptoService.encryptWithAes(
            JSON.stringify(itemData[field]),
            encryptionKey
          );
          if (fieldEncryptionResult.error)
            return { error: fieldEncryptionResult.error };

          const { encryptedData } = fieldEncryptionResult;

          itemData[field] = encryptedData;
        }
      }
      const itemsRef = collection(db, path);
      const savedItem = await addDoc(itemsRef, { ...itemData });

      return { itemId: savedItem.id };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseFirestoreError(error) };
    }
  },

  async readItems(pathData) {
    try {
      const { path, decryptionKey } = pathData;

      const itemsRef = collection(db, path);
      const itemsSnap = await getDocs(itemsRef);

      const items = {};
      itemsSnap.forEach((docSnap) => {
        const { id } = docSnap;
        const itemData = docSnap.data();

        for (const field of sensitiveFields) {
          if (itemData[field]) {
            const fieldDecryptionResult = cryptoService.decryptWithAes(
              itemData[field],
              decryptionKey
            );
            if (fieldDecryptionResult.error) continue;

            const { decryptedData } = fieldDecryptionResult;

            itemData[field] = JSON.parse(decryptedData);
          }
        }
        items[id] = itemData;
      });

      return { items };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseFirestoreError(error) };
    }
  },

  async readItemsFromAllVaults(pathData) {
    try {
      const { path, decryptionKey } = pathData;

      const vaultsRef = collection(db, path);
      const vaultsSnap = await getDocs(vaultsRef);
      const items = {};
      for (const docSnap of vaultsSnap.docs) {
        const { id } = docSnap;

        const itemsFetchResult = await this.readItems({
          path: `${path}/${id}/items`,
          decryptionKey,
        });
        if (itemsFetchResult.error) continue;

        Object.assign(items, itemsFetchResult.items);
      }
      return { items };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseFirestoreError(error) };
    }
  },

  async updateItem(pathData) {
    try {
      const { path, data, encryptionKey } = pathData;

      data.timestamps.updatedAt = getTimestamp();

      const itemData = { ...data };
      for (const field of sensitiveFields) {
        if (itemData[field]) {
          const fieldEncryptionResult = await cryptoService.encryptWithAes(
            JSON.stringify(itemData[field]),
            encryptionKey
          );
          if (fieldEncryptionResult.error)
            return { error: fieldEncryptionResult.error };

          const { encryptedData } = fieldEncryptionResult;

          itemData[field] = encryptedData;
        }
      }
      const itemRef = doc(db, path);
      await updateDoc(itemRef, { ...itemData });

      return { success: true };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseFirestoreError(error) };
    }
  },

  async deleteItem(pathData) {
    try {
      const { path } = pathData;

      const itemRef = doc(db, path);

      await deleteDoc(itemRef);

      return { success: true };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseFirestoreError(error) };
    }
  },
};
