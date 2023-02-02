// Types
import type { CollectionReference } from "firebase/firestore";
// Libs
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection
} from "firebase/firestore";
// Utils
import { csr } from "@utils/browser";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let metadataCollection: CollectionReference;

const isBrowser = csr();

if (isBrowser && !getApps().length) {
  const app = initializeApp(config);
  const db = getFirestore(app);

  metadataCollection = collection(db, "metadata");

  //! Currently hanging on writes...
  // if (process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATORS) {
  //   console.log("Using Firebase Emulators");
  //   connectFirestoreEmulator(db, "localhost", 8080);
  // }
}

export { metadataCollection };
