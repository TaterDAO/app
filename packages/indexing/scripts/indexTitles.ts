import {
  decodeMetadata,
  makeContract,
  lookupContractAddress
} from "../src/contract";
import algolia from "../src/algolia";
import type { RawMetadata } from "../src/types";
import { HARDHAT_NETWORK_ACCOUNTS, NETWORKS } from "../src/constants";

type IdIndex = { [id: string]: boolean };

// If the querying results in `MISS_THRESHOLD` consecutive misses, we assume that these were not consecutive burns
// and that there are no tokens with a higher Id.
const MISS_THRESHOLD = 25;

let shouldRemoveFromIndex: Array<string> = [];

function validateNetworkArg(value: string) {
  if (!value) {
    throw new Error("Position 0 arg `network` is required");
  }
  if (!NETWORKS.includes(value)) {
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

async function* Fetcher(
  contractAddress: string,
  networkEndpoint: string,
  indexedIds: IdIndex
) {
  const contract = makeContract(networkEndpoint, contractAddress);

  let shouldQuery = true;
  let consecutiveMissCounter = 0;

  async function fetch(tokenId: number) {
    try {
      const res = await contract.methods
        .tokenURI(tokenId)
        .call({ from: HARDHAT_NETWORK_ACCOUNTS[0] });

      // Reset consecutive miss counter
      consecutiveMissCounter = 0;

      return decodeMetadata(res);
    } catch (error) {
      //@ts-expect-error
      const errorMessage = error.message as string;
      if (errorMessage.includes("URI query for nonexistent token")) {
        if (indexedIds.hasOwnProperty(tokenId)) {
          // This ID has been burned and needs to be de-indexed
          shouldRemoveFromIndex.push(tokenId.toString());
        } else {
          // This ID has never been indexed or was previously de-indexed after burning;
          // There could be tokens higher than this.
          consecutiveMissCounter++;
          // Break
          if (consecutiveMissCounter === MISS_THRESHOLD) shouldQuery = false;
        }
      }
      return;
    }
  }

  let tokenId = 0;

  while (shouldQuery) {
    const data = await fetch(tokenId);
    tokenId++;
    yield data;
  }
}

/**
 * Serializes titles for Algolia.
 * @param titles
 * @returns
 */
function serializeTitles(titles: Array<RawMetadata | null>): Array<any> {
  return titles
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
}

/**
 * Main Routine.
 */
(async () => {
  const args = process.argv.slice(2);

  const network = validateNetworkArg(args[0]);
  const networkEndpoint = validateNetworkEndpointArg(args[1]);

  const contractAddress = lookupContractAddress(network);

  console.log(`Indexing ${network} at ${contractAddress}`);

  const index = algolia.initIndex(`titles-${network}`);

  // Query Algolia to determine which Titles have been burned;
  // they will exist in the system but not in the contract.
  let indexedIds: IdIndex = {};
  await index.browseObjects({
    query: "",
    batch: (hits) => {
      hits.forEach((hit) => {
        indexedIds[hit.objectID] = true;
      });
    }
  });

  const fetcher = Fetcher(contractAddress, networkEndpoint, indexedIds);
  const titles = [];

  try {
    for await (const value of fetcher) {
      // Filter misses
      if (!!value) titles.push(value);
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

  console.log(`${titles.length} titles queried`);
  if (titles.length === 0) {
    console.log("No titles to index");
    return;
  }

  if (shouldRemoveFromIndex.length > 0) {
    console.log(`${shouldRemoveFromIndex.length} burned titles to de-index`);
    try {
      await index.deleteObjects(shouldRemoveFromIndex);
      console.log("De-Indexing successful");
    } catch (error) {
      console.error(error);
    }
  }

  try {
    await index.saveObjects(serializeTitles(titles));
    console.log("Indexing successful");
  } catch (error) {
    console.error(error);
  }
})();
