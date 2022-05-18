/**
 * @fileoverview Firebase requires us to use the `functions.config()` method
 * in order to access secrets.  This file serves to abstract away reading the
 * environment variables between development/staging/production envs.
 */
import * as functions from "firebase-functions";

let config = process.env;
// Use firebase config when deployed to firebase
if (process.env.NODE_ENV === "production") {
  const {} = functions.config();
  // config = {
  //   NEXT_PUBLIC_ALGOLIA_APPLICATION_ID: algolia.id,
  //   ALGOLIA_ADMIN_KEY: algolia.key,
  //   SENTRY_DSN: sentry.dsn
  // };
}

export default config;
