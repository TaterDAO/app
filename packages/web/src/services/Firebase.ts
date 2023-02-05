// Types
import type { CollectionReference, Firestore } from "firebase/firestore";
// Libs
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection
} from "firebase/firestore";
import * as admin from "firebase-admin";
// Utils
import { csr } from "@utils/browser";

let metadataCollection: CollectionReference;
let db: Firestore;

// Constants

export const METADATA_COLLECTION_ID = "metadata";

// Set up libraries

const isBrowser = csr();

if (isBrowser && !getApps().length) {
  const app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  });
  db = getFirestore(app);

  metadataCollection = collection(db, METADATA_COLLECTION_ID);

  // ! Currently hanging on writes...
  //if (process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATORS) {
  //console.log("Using Firebase Emulators");
  //connectFirestoreEmulator(db, "localhost", 8080);
  //}
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.FIREBASE_ADMIN_PK,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    })
  });

  // if (process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATORS) {
  //   admin.firestore().settings({
  //     host: "localhost:8080",
  //     ssl: false
  //   });
  // }
}

export { metadataCollection, db, admin };
