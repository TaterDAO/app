import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.FIREBASE_ADMIN_PK.replace(/\\n/gm, "\n"),
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

export default admin;
