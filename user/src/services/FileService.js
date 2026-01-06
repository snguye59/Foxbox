import {
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import {
  doc,
  query,
  addDoc,
  getDocs,
  orderBy,
  deleteDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { cryptoService } from "src/services";
import { errorService } from "./ErrorService";
import { db, storage } from "src/libs/firebase";

export const fileService = {
  async readFiles(pathData) {
    try {
      const { path, decryptionKey } = pathData;

      const filesRef = collection(db, path);
      const filesSnap = await getDocs(
        query(filesRef, orderBy("timestamp.createdAt"))
      );

      const files = {};
      filesSnap.forEach((docSnap) => {
        const { id } = docSnap;
        const { encryptedData } = docSnap.data();

        const fileDecryptionResult = cryptoService.decryptWithAes(
          encryptedData,
          decryptionKey
        );

        if (fileDecryptionResult.error)
          return { error: fileDecryptionResult.error };

        const { decryptedData } = fileDecryptionResult;

        const fileObj = JSON.parse(decryptedData);
        files[id] = { id, ...fileObj };
      });

      return { files };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseFirestoreError(error) };
    }
  },

  async saveFile(pathData) {
    try {
      const { path, data, encryptionKey } = pathData;

      const fileData = JSON.stringify(data);
      const fileEncryptionResult = await cryptoService.encryptWithAes(
        fileData,
        encryptionKey
      );

      if (fileEncryptionResult.error)
        return { error: fileEncryptionResult.error };

      const { encryptedData } = fileEncryptionResult;

      const filesRef = collection(db, path);

      const savedFile = await addDoc(filesRef, {
        encryptedData,
        timestamp: { createdAt: serverTimestamp() },
      });

      return { fileId: savedFile.id };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseFirestoreError(error) };
    }
  },

  async uploadFile(pathData) {
    try {
      const { path, data, encryptionKey, onUploadsUpdate } = pathData;

      const storageRef = ref(storage, path);

      const fileEncryptionResult = await cryptoService.encryptFile(
        data,
        encryptionKey
      );
      if (fileEncryptionResult.error)
        return { error: fileEncryptionResult.error };

      const { encryptedFile } = fileEncryptionResult;
      const blob = new Blob([encryptedFile]);

      const uploadTask = uploadBytesResumable(storageRef, blob);

      onUploadsUpdate((uploads) =>
        uploads.map((upload) => {
          return upload.file.name === data.name
            ? { ...upload, uploadTask }
            : upload;
        })
      );

      const url = await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (
              (snapshot.bytesTransferred / snapshot.totalBytes) *
              100
            ).toFixed(0);
            onUploadsUpdate((uploads) =>
              uploads.map((upload) => {
                return upload.file.name === data.name
                  ? { ...upload, progress }
                  : upload;
              })
            );
          },
          (error) => {
            reject(error);
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          }
        );
      });
      onUploadsUpdate((uploads) =>
        uploads.filter((upload) => upload.file.name !== data.name)
      );

      return { url };
    } catch (error) {
      console.error(error);
      return {
        error: errorService.handleFirebaseStorageError(error),
      };
    }
  },

  async downloadFile(pathData) {
    try {
      const { data, decryptionKey, onDownloadsUpdate } = pathData;
      const { id, url, size } = data;

      const abortController = new AbortController();
      onDownloadsUpdate((downloads) => ({
        ...downloads,
        [id]: { controller: abortController },
      }));

      const response = await fetch(url, { signal: abortController.signal });
      const reader = response.body.getReader();
      let receivedLength = 0;
      let chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        receivedLength += value.length;
        onDownloadsUpdate((downloads) => ({
          ...downloads,
          [id]: {
            ...downloads[id],
            progress: ((receivedLength / size) * 100).toFixed(0),
          },
        }));
      }
      const blob = new Blob(chunks);
      const fileDecryptionResult = await cryptoService.decryptFile(
        blob,
        decryptionKey
      );

      if (fileDecryptionResult.error)
        return { error: fileDecryptionResult.error };

      const { decryptedFile } = fileDecryptionResult;

      const decryptedBlob = new Blob([decryptedFile]);

      return { decryptedBlob };
    } catch (error) {
      console.error(error);
      if (error.name === "AbortError")
        return { error: "The operation is canceled." };
      return { error: errorService.handleFirebaseStorageError(error) };
    }
  },

  async deleteFile(pathData) {
    try {
      const { firestorePath, storagePath } = pathData;

      const fileRef = doc(db, firestorePath);
      await deleteDoc(fileRef);

      const storageRef = ref(storage, storagePath);
      await deleteObject(storageRef);

      return { success: true };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseStorageError(error) };
    }
  },
};
