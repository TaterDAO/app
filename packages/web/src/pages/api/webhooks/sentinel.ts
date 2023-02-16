import type { NextApiRequest, NextApiResponse } from "next";
import { methods } from "@utils/api/middleware";

import admin from "@services/Firebase/admin";
import {
  TOKENS_COLLECTION_ID,
  METADATA_COLLECTION_ID,
  CONTRACT_EVENTS_COLLECTION_ID
} from "@services/Firebase";

const sentinelIds = {
  1: process.env.OZD_ETHEREUM_SENTINEL_ID,
  5: process.env.OZD_GOERLI_SENTINEL_ID,
  42161: process.env.OZD_ARB_SENTINEL_ID,
  421613: process.env.OZD_ARB_GOERLI_SENTINEL_ID,
  137: process.env.OZD_POLYGON_SENTINEL_ID
  //80001: ""
};

/**
 * Fetches metadata for a given token.
 */
async function handler(req: NextApiRequest, res: NextApiResponse<{}>) {
  // Write event to the database
  const db = admin.firestore();
  await db.collection(CONTRACT_EVENTS_COLLECTION_ID).add(req.body);

  const {
    matchReasons,
    transaction,
    sentinel: { id: sentinelId, chainId }
  } = req.body.events[0];

  // Verify msg authenticity by comparing Sentinel id.
  if (sentinelId !== sentinelIds[chainId]) {
    res.status(403).send({});
    return;
  }

  const match = matchReasons[0];

  if (match.signature.startsWith("mint")) {
    const tokenId = transaction.logs[0].topics[3] as string;
    await db.collection(TOKENS_COLLECTION_ID).add({
      chainId,
      tokenId: parseInt(tokenId.replace("0x", "")),
      metadata: db
        .collection(METADATA_COLLECTION_ID)
        .doc(match.params.metadataId_),
      burnt: false
    });
  } else if (match.signature.startsWith("burn")) {
    const tokenId = parseInt(match.params.tokenId_);
    const snapshot = await db
      .collection(TOKENS_COLLECTION_ID)
      .where("tokenId", "==", tokenId)
      .where("chainId", "==", chainId)
      .get();

    if (!snapshot.empty) {
      await db
        .collection(TOKENS_COLLECTION_ID)
        .doc(snapshot.docs[0].id)
        .update({ burnt: true });
    }
  }

  res.status(200).send({});
}

export default methods(handler, ["POST"]);
