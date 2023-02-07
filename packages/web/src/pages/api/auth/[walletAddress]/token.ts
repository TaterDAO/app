import type { NextApiRequest, NextApiResponse } from "next";
import type { v230203TaterMetadataSchema } from "@T/TATR";
import admin from "@services/Firebase/admin";
import { ACCOUNTS_COLLECTION_ID } from "@services/Firebase";

import { v4 as uuidv4 } from "uuid";

import { methods } from "@utils/api/middleware";

/**
 * Fetches metadata for a given token.
 */
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ token: string } | string>
) {
  const walletAddress = req.query.walletAddress as string;

  const db = admin.firestore();
  const doc = await db
    .collection(ACCOUNTS_COLLECTION_ID)
    .doc(walletAddress)
    .get();

  let token: string;
  let status: number;
  if (doc.exists) {
    const data = doc.data() as Record<string, string>;
    token = data.token;
    status = 200;
  } else {
    token = uuidv4();
    status = 201;

    // Save token
    await db
      .collection(ACCOUNTS_COLLECTION_ID)
      .doc(walletAddress)
      .set({ token });
  }

  res.status(status).json({ token });
}

export default methods(handler, ["GET"]);
