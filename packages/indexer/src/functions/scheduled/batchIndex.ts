import * as functions from "firebase-functions";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export default functions
  .runWith({ memory: "4GB" }) // Ensure enough memory to process
  .pubsub.schedule("* * * * *") // Run every minute
  .onRun(async () => {
    functions.logger.info("Indexing", { structuredData: true });
  });
