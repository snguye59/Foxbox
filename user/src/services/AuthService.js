import {
  signOut,
  deleteUser,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "src/libs/firebase";
import { keyService } from "./KeyService";
import { errorService } from "./ErrorService";
import { userDataService } from "./UserDataService";
import { userAvatarsData } from "src/data/userAvatarsData";
import { EmailAuthProvider } from "firebase/auth";

export const authService = {
  async register(credential) {
    try {
      const { name, email, password, reminder } = credential;
      const {
        user: { uid },
      } = await createUserWithEmailAndPassword(auth, email, password);

      const keysCreationResult = await keyService.createUserKeys(credential);

      if (keysCreationResult.error) {
        await deleteUser(auth.currentUser);
        return { error: keysCreationResult.error };
      }

      const { keys, encryptedKeys } = keysCreationResult;

      const profile = {
        email,
        name: name ?? "Foxbox User",
        avatar:
          userAvatarsData[Math.floor(Math.random() * userAvatarsData.length)],
        reminder: reminder ?? "",
      };
      const settings = {
        notifications: {
          timeoutAlerts: 15,
          emailAlerts: false,
          pushNotifications: false,
        },
        privacy: {
          dataSharing: false,
          locationTracking: false,
        },
      };
      const userData = {
        profile,
        encryptedKeys,
        settings,
      };
      const userCreationResult = await userDataService.createUserInFirestore(
        uid,
        userData
      );
      if (userCreationResult.error) {
        await deleteUser(auth.currentUser);
        return { error: userCreationResult.error };
      }

      return {
        userInfo: { uid, profile, keys, settings },
      };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseAuthError(error) };
    }
  },

  async login(credential) {
    try {
      const { email, password, publicComputer } = credential;
      const {
        user: { uid },
      } = await signInWithEmailAndPassword(auth, email, password);

      const userFetchResult = await userDataService.readUserFromFirestore(uid);
      if (userFetchResult.error) return { error: userFetchResult.error };

      const { data } = userFetchResult;

      const { profile, encryptedKeys, settings } = data;

      const keysDecryptionResult = await keyService.decryptUserKeys(
        credential,
        encryptedKeys
      );
      if (keysDecryptionResult.error)
        return { error: keysDecryptionResult.error };

      const { publicKey, secretKey, privateKey } = keysDecryptionResult;

      const modifiedSettings = publicComputer
        ? {
            ...settings,
            notifications: {
              ...settings.notifications,
              timeoutAlerts: 15,
            },
          }
        : settings;

      return {
        userInfo: {
          uid,
          profile,
          keys: { publicKey, secretKey, privateKey },
          settings: modifiedSettings,
        },
      };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseAuthError(error) };
    }
  },

  async reauthenticate(credential) {
    try {
      const { email, password } = credential;

      if (auth.currentUser) {
        await reauthenticateWithCredential(
          auth.currentUser,
          EmailAuthProvider.credential(email, password)
        );
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      return { success: true };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseAuthError(error) };
    }
  },

  async logout() {
    try {
      await signOut(auth);

      return { success: true };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseAuthError(error) };
    }
  },
};
