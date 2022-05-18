// Types
import type { NextApiRequest, NextApiResponse } from "next";

// Libs
import algolia from "algoliasearch";

const client = algolia(
  process.env.ALGOLIA_APPLICATION_ID as string,
  process.env.ALGOLIA_SEARCH_KEY as string
);

async function handler(req: NextApiRequest, res: NextApiResponse<{}>) {
  const tokenId = req.query.tokenId as string;
  const chainId = req.query.chainId as string;
  const index = client.initIndex(`titles-${chainId}`);
  await index.deleteObject(tokenId);
  res.status(200).json({});
}

export default handler;
