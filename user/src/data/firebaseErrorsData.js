export const firebaseAuthError = {
  "auth/admin-restricted-operation":
    "This operation is restricted to administrators only.",
  "auth/argument-error":
    "One or more arguments provided to a function are invalid.",
  "auth/app-not-authorized":
    "This app is not authorized to use Firebase Authentication with the provided API key.",
  "auth/app-not-installed":
    "The requested mobile application corresponding to the domain specified in the request's 'continueUrl' parameter is not installed on this device.",
  "auth/captcha-check-failed":
    "The reCAPTCHA response token provided is either invalid, expired, or has already been used.",
  "auth/code-expired": "The action code has expired. Please try again.",
  "auth/cordova-not-ready": "Cordova framework is not ready.",
  "auth/cors-unsupported": "This browser is not supported.",
  "auth/credential-already-in-use":
    "This credential is already associated with a different user account.",
  "auth/custom-token-mismatch":
    "The custom token corresponds to a different Firebase project.",
  "auth/requires-recent-login":
    "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
  "auth/dependent-sdk-initialized-before-auth":
    "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call 'firebase.auth().onAuthStateChanged()' or similar immediately after initializing Firebase.",
  "auth/dynamic-link-not-activated":
    "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
  "auth/email-change-needs-verification":
    "Multi-factor users must always have a verified email.",
  "auth/email-already-in-use":
    "The email address is already in use by another account.",
  "auth/emulator-config-failed": "The emulator hub failed to start.",
  "auth/expired-action-code": "The action code has expired. Please try again.",
  "auth/cancelled-popup-request":
    "This operation has been cancelled due to another conflicting popup being opened.",
  "auth/internal-error": "An internal error has occurred.",
  "auth/invalid-api-key":
    "Your API key is invalid, please check you have copied it correctly from the Firebase Console.",
  "auth/invalid-app-credential":
    "The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
  "auth/invalid-app-id":
    "The mobile app identifier is not registed for the current project.",
  "auth/invalid-user-token":
    "The user's credential is no longer valid. The user must sign in again.",
  "auth/invalid-auth-event": "An internal error has occurred.",
  "auth/invalid-cert-hash": "The SHA-1 certificate hash provided is invalid.",
  "auth/invalid-verification-code": "The verification code is invalid.",
  "auth/invalid-continue-uri": "The provided continuation URL is invalid.",
  "auth/invalid-cordova-configuration": "The Cordova configuration is invalid.",
  "auth/invalid-custom-token":
    "The custom token format is invalid or the token is malformed.",
  "auth/invalid-dynamic-link-domain":
    "The provided dynamic link domain is invalid.",
  "auth/invalid-email": "The email address is invalid.",
  "auth/invalid-emulator-scheme": "The emulator URL scheme is invalid.",
  "auth/invalid-credential": "The provided credential is invalid.",
  "auth/invalid-message-payload": "The message payload is invalid.",
  "auth/invalid-multi-factor-session": "The multi-factor session is invalid.",
  "auth/invalid-oauth-client-id": "The OAuth client ID is invalid.",
  "auth/invalid-oauth-provider": "The OAuth provider is invalid.",
  "auth/invalid-action-code": "The action code is invalid.",
  "auth/unauthorized-domain":
    "The domain of the email address is not authorized.",
  "auth/wrong-password": "The provided password is incorrect.",
  "auth/invalid-persistence-type": "The persistence type is invalid.",
  "auth/invalid-phone-number": "The phone number is invalid.",
  "auth/invalid-provider-id": "The provider ID is invalid.",
  "auth/invalid-recipient-email": "The recipient email is invalid.",
  "auth/invalid-sender": "The email sender is invalid.",
  "auth/invalid-verification-id": "The verification ID is invalid.",
  "auth/invalid-tenant-id": "The tenant ID provided is invalid.",
  "auth/multi-factor-info-not-found": "The multi-factor info is not found.",
  "auth/multi-factor-auth-required":
    " Multi-factor authentication is required to access this resource.",
  "auth/missing-android-pkg-name": "The Android package name is missing.",
  "auth/missing-app-credential": "The app credential is missing.",
  "auth/auth-domain-config-required":
    " The Auth domain configuration is required.",
  "auth/missing-verification-code": "The verification code is missing.",
  "auth/missing-continue-uri":
    "A valid continue URL must be provided in the request.",
  "auth/missing-iframe-start":
    "An internal error occurred while attempting to initialize the Firebase Auth iframe app.",
  "auth/missing-ios-bundle-id":
    "An iOS Bundle ID must be provided if the App Store ID is not used.",
  "auth/missing-or-invalid-nonce": "The request is missing a valid nonce.",
  "auth/missing-multi-factor-info":
    "No corresponding MFA enrollment found for this user.",
  "auth/missing-multi-factor-session":
    "The request is missing a valid multi-factor session.",
  "auth/missing-phone-number":
    "To send verification codes, provide a phone number for the recipient.",
  "auth/missing-verification-id":
    "The phone auth credential was created with an invalid verification ID.",
  "auth/app-deleted": "The specified Firebase App has been deleted.",
  "auth/account-exists-with-different-credential":
    "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
  "auth/network-request-failed":
    "A network error occurred while attempting to reach the Firebase authentication server.",
  "auth/null-user":
    "A null user object was provided as the argument for an operation that requires a non-null user object.",
  "auth/no-auth-event":
    "An internal error occurred while attempting to initiate a Firebase Auth event.",
  "auth/no-such-provider":
    "User was not authenticated because the specified identity provider was not recognized.",
  "auth/operation-not-allowed":
    "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
  "auth/operation-not-supported-in-this-environment":
    "This operation is not supported in the environment this application is running on. 'location.protocol' must be http or https.",
  "auth/popup-blocked":
    "Unable to establish a connection with the popup. It may have been blocked by the browser.",
  "auth/popup-closed-by-user":
    "The popup was closed by the user before finalizing the operation.",
  "auth/provider-already-linked":
    "This credential is already associated with a different user account.",
  "auth/quota-exceeded":
    "The project's quota for this operation has been exceeded.",
  "auth/redirect-cancelled-by-user":
    "The redirect operation has been cancelled by the user before finalizing.",
  "auth/redirect-operation-pending":
    "A redirect sign-in operation is already pending.",
  "auth/rejected-credential":
    "The request contains malformed or mismatching credentials.",
  "auth/second-factor-already-in-use":
    "The second factor is already enrolled on this account.",
  "auth/maximum-second-factor-count-exceeded":
    "The maximum allowed number of second factors on a user has been exceeded.",
  "auth/tenant-id-mismatch":
    "The provided tenant ID does not match the authenticated tenant ID.",
  "auth/timeout": "The operation has timed out.",
  "auth/user-token-expired":
    "The user's credential is no longer valid. The user must sign in again.",
  "auth/too-many-requests":
    "We have blocked all requests from this device due to unusual activity. Try again later.",
  "auth/unauthorized-continue-uri":
    "The domain of the continue URL is not whitelisted. Whitelist the domain in the Firebase console.",
  "auth/unsupported-first-factor":
    "Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.",
  "auth/unsupported-persistence-type":
    "The requested persistence type is not supported by the current environment.",
  "auth/unsupported-tenant-operation":
    "This operation is not supported in a multi-tenant context.",
  "auth/unverified-email":
    "The email address associated with the user's account has not been verified.",
  "auth/user-cancelled": "The user cancelled the operation.",
  "auth/user-not-found":
    "There is no user record corresponding to the provided identifier.",
  "auth/user-disabled":
    "The user account has been disabled by an administrator.",
  "auth/user-mismatch":
    "The user ID in the request does not match the user ID associated with the credential used to authenticate the user.",
  "auth/user-signed-out": "The user has been signed out.",
  "auth/weak-password": "The password is too weak.",
  "auth/web-storage-unsupported":
    "The current environment does not support web storage or if the user disables web storage.",
  "auth/already-initialized":
    "This SDK instance's auth module has already been initialized with an app instance.",
  "auth/invalid-login-credentials":
    "The login credentials provided are invalid.",
  "auth/unavailable":
    "The service is currently unavailable.. This can happen if the client is offline or unable to reach the Firebase servers. Ensure your device has a stable internet connection and try again.",
};

export const firebaseStorageError = {
  "storage/unknown": "An unknown error occurred.",
  "storage/object-not-found": "No object exists at the desired reference.",
  "storage/bucket-not-found": "No bucket is configured for Cloud Storage.",
  "storage/project-not-found": "No project is configured for Cloud Storage.",
  "storage/quota-exceeded":
    "Quota on your Cloud Storage bucket has been exceeded.",
  "storage/unauthenticated": "Please authenticate and try again.",
  "storage/unauthorized": "This operation is not allowed.",
  "storage/retry-limit-exceeded":
    "The maximum time limit on an operation has been exceeded.",
  "storage/invalid-checksum":
    "File on the client does not match the checksum of the file received by the server.",
  "storage/canceled": "The operation is canceled.",
  "storage/invalid-event-name": "Invalid event name provided.",
  "storage/invalid-url": "Invalid URL provided.",
  "storage/invalid-argument": "Invalid argument provided.",
  "storage/no-default-bucket":
    "No bucket has been set in config's storageBucket property.",
  "storage/cannot-slice-blob": "Blob can't be sliced.",
  "storage/server-file-wrong-size":
    "File on the client does not match the size of the file received by the server.",
};

export const firebaseFirestoreError = {
  "firestore/cancelled":
    "The operation was cancelled (typically by the caller).",
  "firestore/unknown":
    "Unknown error or an error from a different error domain.",
  "firestore/invalid-argument": "Client specified an invalid argument.",
  "firestore/deadline-exceeded":
    "Deadline expired before operation could complete.",
  "firestore/not-found": "Some requested document was not found.",
  "firestore/already-exists":
    "Some document that we attempted to create already exists.",
  "firestore/permission-denied":
    "The caller does not have permission to execute the specified operation.",
  "firestore/resource-exhausted":
    "Some resource has been exhausted, perhaps a per-user quota.",
  "firestore/failed-precondition":
    "Operation was rejected because the system is not in a state required for the operation.",
  "firestore/aborted":
    "The operation was aborted, typically due to a concurrency issue.",
  "firestore/out-of-range": "Operation was attempted past the valid range.",
  "firestore/unimplemented":
    "Operation is not implemented or not supported/enabled.",
  "firestore/internal":
    "Internal errors. Means some invariants expected by the underlying system have been broken.",
  "firestore/unavailable": "The service is currently unavailable.",
  "firestore/data-loss": "Unrecoverable data loss or corruption.",
  "firestore/unauthenticated":
    "The request does not have valid authentication credentials.",
};
