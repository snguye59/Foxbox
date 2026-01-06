import {
  getAuth,
  setPersistence,
  inMemoryPersistence,
  connectAuthEmulator,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBCvzo_Uq3QcTkGmxpjPw5GhpoimeV4HAo",
  authDomain: "foxbox-5653c.firebaseapp.com",
  projectId: "foxbox-5653c",
  storageBucket: "foxbox-5653c.firebasestorage.app",
  messagingSenderId: "306285148398",
  appId: "1:306285148398:web:68eddbc026d762e1875bff",
  measurementId: "G-08LE695YRR",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
setPersistence(auth, inMemoryPersistence);

const storage = getStorage(app);

const db = getFirestore(app);

const functions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  connectFunctionsEmulator(functions, "localhost", 3002);
  connectFirestoreEmulator(db, "localhost", 3003);
  connectStorageEmulator(storage, "localhost", 3004);
  connectAuthEmulator(auth, "http://localhost:3005");
}

export { db, auth, storage, functions };
