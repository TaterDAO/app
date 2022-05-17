// Types
import type { NextApiRequest, NextApiResponse } from "next";
import type { AbiItem } from "web3-utils";

// Libs
import algolia from "algoliasearch";
import Web3 from "web3";

import abi from "@data/contracts/TitleV1_0.sol/TitleV1_0.json";

// Utils
import { getChainConfig } from "@utils/chain";

const client = algolia(
  process.env.ALGOLIA_APPLICATION_ID as string,
  process.env.ALGOLIA_SEARCH_KEY as string
);

function decodeMetadata(raw: string): object | null {
  let text;
  try {
    const buff = Buffer.from(
      raw.replace("data:application/json;base64,", ""),
      "base64"
    );
    text = buff.toString("utf8");
    return JSON.parse(text);
  } catch (error) {
    console.log("\nError Decoding Metadata:");
    console.log(text);
    console.log(error);
    return null;
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse<{}>) {
  const chainId = parseInt(req.query.chainId as string);
  const tokenId = parseInt(req.query.tokenId as string);

  const chainConfig = getChainConfig(chainId);

  const web3 = new Web3(chainConfig?.rpc.endpoint as string);
  const contract = new web3.eth.Contract(
    abi as Array<AbiItem>,
    chainConfig?.contract.address as string
  );

  const contractResponse: string = await contract.methods
    .tokenURI(tokenId)
    .call({
      // Hardcode for now
      from: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
    });
  const data: any = decodeMetadata(contractResponse);

  // If data was bad.
  if (data) {
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
