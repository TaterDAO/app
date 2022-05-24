import {
  decodeMetadata,
  makeContract,
  lookupContractAddress
} from "../src/contract";
import algolia from "../src/algolia";
import type { RawMetadata } from "../src/types";
import { HARDHAT_NETWORK_ACCOUNTS } from "../src/constants";

function validateNetworkArg(value: string) {
  if (!value) {
    throw new Error("Position 0 arg `network` is required");
  }
  if (!["localhost", "arbitrum_testnet"].includes(value)) {
    throw new Error(`Network [${value}] is unsupported`);
  }

  return value;
}

function validateNetworkEndpointArg(value: string) {
  if (!value) {
    throw new Error("Position 1 arg `networkEndpoint` is required");
  }

  try {
    new URL(value);
  } catch (error) {
    throw new Error(`Network Endpoint [${value}] is not a valid url`);
  }

  return value;
}

async function* Fetcher(network: string, networkEndpoint: string) {
  const contract = makeContract(
    networkEndpoint,
    lookupContractAddress(network)
  );

  async function fetch(tokenId: number) {
    const res = await contract.methods
      .tokenURI(tokenId)
      .call({ from: HARDHAT_NETWORK_ACCOUNTS[0] });
    return decodeMetadata(res);
  }

  let tokenId = 0;

  while (true) {
    const data = await fetch(tokenId);
    tokenId++;
    yield data;
  }
}

/**
 * Main Routine.
 */
(async () => {
  const args = process.argv.slice(2);

  const network = validateNetworkArg(args[0]);
  const networkEndpoint = validateNetworkEndpointArg(args[1]);

  const fetcher = Fetcher(network, networkEndpoint);
  const titles = [];

  try {
    for await (const value of fetcher) {
      titles.push(value);
    }
  } catch (error) {
    //@ts-expect-error
    const msg = error.message;
    if (msg.includes("ERC721Metadata: URI query for nonexistent token")) {
      // noop
    } else {
      //@ts-expect-error
      throw new Error(error);
    }
  }

  const serializedTitles = titles
    .filter((title) => title)
    .map((data) => {
      const {
        tokenId,
        owner,
        name,
        description,
        external_url,
        image,
        attributes
      } = data as RawMetadata;

      return {
        objectID: tokenId,
        tokenId: parseInt(tokenId),
        owner: owner.toLowerCase(),
        name,
        description,
        externalUrl: external_url,
        image,
        "attr.LandClassification": attributes[0].value,
        "attr.Location": attributes[1].value,
        "attr.Deed": attributes[2].value,
        "attr.Parcels": attributes[3].value,
        "attr.Owner": attributes[4].value,
        "attr.Kml": attributes[5].value,
        "attr.Tag": attributes[6].value,
        "attr.CreatedDate": parseInt(attributes[7].value),
        "attr.MaxSupply": parseInt(attributes[8].value)
      };
    });

  const algoliaIndex = algolia.initIndex(`titles-${network}`);

  try {
    await algoliaIndex.saveObjects(serializedTitles);
    console.log("Successfully indexed");
  } catch (error) {
    console.error(error);
  }
})();
