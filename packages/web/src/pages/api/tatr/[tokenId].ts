import type { NextApiRequest, NextApiResponse } from "next";
import type { v230203TaterMetadataSchema } from "@T/TATR";
import admin from "@services/Firebase/admin";
import { METADATA_COLLECTION_ID } from "@services/Firebase";
import { methods } from "@utils/api/middleware";

/**
 * Fetches metadata for a given token.
 */
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<v230203TaterMetadataSchema | string>
) {
  const tokenId = req.query.tokenId as string;

  const db = admin.firestore();
  const doc = await db.collection(METADATA_COLLECTION_ID).doc(tokenId).get();

  if (doc.exists) {
    const data = doc.data();
    res.status(200).json(data?.metadata);
  } else {
    res.status(404).send("");
  }
}

export default methods(handler, ["GET"]);
