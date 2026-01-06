import { db } from "src/libs/firebase";
import { errorService } from "./ErrorService";
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

export const userDataService = {
  async createUserInFirestore(uid, data) {
    try {
      const userRef = doc(db, `users/${uid}`);
      await setDoc(userRef, data);

      return { success: true };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseFirestoreError(error) };
    }
  },

  async readUserFromFirestore(uid) {
    try {
      const userRef = doc(db, `users/${uid}`);
      const userSnap = await getDoc(userRef);

      return { data: userSnap.data() };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseFirestoreError(error) };
    }
  },

  async updateUserInFirestore(uid, data) {
    try {
      const userRef = doc(db, `users/${uid}`);
      await updateDoc(userRef, data);

      return { success: true };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseFirestoreError(error) };
    }
  },

  async deleteUserFromFirestore(uid) {
    try {
      const userRef = doc(db, `users/${uid}`);
      await deleteDoc(userRef);

      return { success: true };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseFirestoreError(error) };
    }
  },
};
