/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require("firebase-functions/v1");

exports.cleanupOrphanedAuthUsers = functions.auth
  .user()
  .onCreate(async (user) => {
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get();
    if (!userDoc.exists) {
      await admin.auth().deleteUser(user.uid);
    }
  });
