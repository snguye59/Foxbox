import {
  firebaseAuthError,
  firebaseStorageError,
  firebaseFirestoreError,
} from "src/data/firebaseErrorsData";

export const errorService = {
  handleFirebaseAuthError(error) {
    return (
      firebaseAuthError[error.code] ||
      "Something unexpected happened. Please try again later."
    );
  },
  handleFirebaseStorageError(error) {
    return (
      firebaseStorageError[error.code] ||
      "Something unexpected happened. Please try again later."
    );
  },
  handleFirebaseFirestoreError(error) {
    return (
      firebaseFirestoreError[error.code] ||
      "Something unexpected happened. Please try again later."
    );
  },
};
