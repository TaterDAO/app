// Types
import type { NextApiRequest, NextApiResponse } from "next";

// Libs
import algolia from "algoliasearch";
import TitleContract from "@libs/TitleContract";

// Utils
import { getChainConfig } from "@utils/chain";

const client = algolia(
  process.env.ALGOLIA_APPLICATION_ID as string,
  process.env.ALGOLIA_SEARCH_KEY as string
);

async function handler(req: NextApiRequest, res: NextApiResponse<{}>) {
  const chainId = parseInt(req.query.chainId as string);
  const tokenId = parseInt(req.query.tokenId as string);

  const contract = new TitleContract(chainId);
  const data = await contract.getData(tokenId);

  // If data was bad.
  if (data) {
    const chainConfig = getChainConfig(chainId);
    const algoliaIndex = client.initIndex(`titles-${chainConfig?.chain.id}`);

    try {
      await algoliaIndex.saveObject({
        objectID: tokenId,
        tokenId,
        owner: data.owner.toLowerCase(),
        name: data.name,
        description: data.description,
        externalUrl: data.external_url,
        image: data.image,
        "attr.LandClassification": data.attributes[0].value,
        "attr.Location": data.attributes[1].value,
        "attr.Deed": data.attributes[2].value,
        "attr.Parcels": data.attributes[3].value,
        "attr.Owner": data.attributes[4].value,
        "attr.Kml": data.attributes[5].value,
        "attr.Tag": data.attributes[6].value,
        "attr.CreatedDate": parseInt(data.attributes[7].value),
        "attr.MaxSupply": parseInt(data.attributes[8].value)
      });
    } catch (error) {
      // noop
    } finally {
      res.status(200).json({});
    }
  } else {
    res.status(200).json({});
  }
}

export default handler;
