import { db } from "src/libs/firebase";
import { errorService } from "./ErrorService";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { announcementsData } from "src/data/announcementsData";

export const announcementService = {
  async hasDismissedLatestAnnouncement(uid) {
    try {
      const dismissedAnnouncementsRef = doc(
        db,
        `users/${uid}/dismissedAnnouncements/${announcementsData[0].id}`
      );
      const dismissedAnnouncementsSnap = await getDoc(
        dismissedAnnouncementsRef
      );
      return {
        result:
          dismissedAnnouncementsSnap.exists() &&
          dismissedAnnouncementsSnap.data().status,
      };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseFirestoreError(error) };
    }
  },

  async dismissAnnouncement(uid) {
    try {
      const dismissedAnnouncementsRef = doc(
        db,
        `users/${uid}/dismissedAnnouncements/${announcementsData[0].id}`
      );
      await setDoc(dismissedAnnouncementsRef, { status: true });

      return { success: true };
    } catch (error) {
      console.error(error);
      return { error: errorService.handleFirebaseFirestoreError(error) };
    }
  },
};
