// Types
import type { AutotaskEvent } from "defender-autotask-utils";
import type { RelayerParams } from "defender-relay-client";
import type { SearchIndex, SearchClient } from "algoliasearch";
import type { ObjectWithObjectID } from "@algolia/client-search";
import type { Contract } from "web3-eth-contract";
import type { RawMetadata } from "../../types/contract";
import type { AbiItem } from "web3-utils";

// 3rd Party modules
import { DefenderRelayProvider } from "defender-relay-client/lib/web3";
import Web3 from "web3";

// Package modules
import makeAlgoliaClient, { serializeTitles } from "../../services/algolia";
import { decodeMetadata } from "../../utils/contract";

// Shared modules
import ABI from "../../data/abi/contracts/TitleV1_0.sol/TitleV1_0.json";

type AlgoliaRecordsById = { [id: string]: ObjectWithObjectID };

class Indexer {
  // Contract
  private _web3: Web3;
  private _contract: Contract;
  private _cachedFrom: undefined | string = undefined;

  // Algolia
  private _algoliaClient: SearchClient;
  private _algoliaIndex: SearchIndex;

  constructor(
    event: AutotaskEvent & RelayerParams,
    networkId: string,
    contractAddress: string
  ) {
    this._web3 = new Web3(
      new DefenderRelayProvider(event, { speed: "average" })
    );
    this._contract = new this._web3.eth.Contract(
      ABI as Array<AbiItem>,
      contractAddress
    );

    this._algoliaClient = makeAlgoliaClient(
      event.secrets?.ALGOLIA_APPLICATION_ID as string,
      event.secrets?.ALGOLIA_ADMIN_KEY as string
    );
    this._algoliaIndex = this._algoliaClient.initIndex(`titles-${networkId}`);
  }

  /**
   * Returns the sender address. Implements a get-cache-or-query strategy.
   * @returns Promise resolving address.
   */
  private async _from(): Promise<string> {
    if (this._cachedFrom) return this._cachedFrom;
    else {
      const [from] = await this._web3.eth.getAccounts();
      this._cachedFrom = from;
      return from;
    }
  }

  /**
   * Loads records from Algolia.
   */
  private async _loadRecords(): Promise<AlgoliaRecordsById> {
    const records: Array<ObjectWithObjectID> = await new Promise(
      async (resolve) => {
        await this._algoliaIndex.browseObjects({
          query: "",
          batch: (hits) => {
            resolve(hits as Array<ObjectWithObjectID>);
          }
        });
      }
    );

    return records.reduce(
      (memo: AlgoliaRecordsById, record) => ({
        ...memo,
        [record.objectID]: record
      }),
      {}
    );
  }

  private async _getTokenMetadata(
    tokenId: string
  ): Promise<RawMetadata | null> {
    console.log(`Querying metadata for Token Id ${tokenId}`);
    const res = await this._contract.methods
      .tokenURI(tokenId)
      .call({ from: await this._from() });

    return decodeMetadata(res);
  }

  /**
   * Index the contract into Algolia.
   */
  public async index() {
    console.log("Indexing");

    // BURNING: Query records already indexed by Algolia; these will be used to determine
    // which Titles have been burned - they'll exist in Algolia but not in the contract.
    const indexedRecords = await this._loadRecords();

    // BURNING: Query burn events and update map
    // TODO: This is breaking on Arb One.
    const requiresDeIndexing: { [id: string]: boolean } = {};
    const burned: { [id: string]: boolean } = {};
    (
      await this._contract.getPastEvents("Transfer", {
        filter: { to: "0x0000000000000000000000000000000000000000" },
        fromBlock: 0
      })
    ).forEach((event) => {
      const tokenId = event.returnValues.tokenId;

      burned[tokenId] = true;

      // If already indexed on Algolia
      if (indexedRecords.hasOwnProperty(tokenId))
        requiresDeIndexing[tokenId] = true;
    });

    console.log(`${Object.keys(burned).length} tokens burned`);

    // BURNING: Remove burned tokens from Algolia
    const requiresDeIndexingArray = Object.keys(requiresDeIndexing);
    if (requiresDeIndexingArray.length > 0) {
      console.log(
        `${requiresDeIndexingArray.length} burned titles to de-index`
      );
      try {
        //await this._algoliaIndex.deleteObjects(requiresDeIndexingArray);
        console.log("De-Indexing successful");
      } catch (error) {
        console.error(error);
      }
    }

    // MINTING: Determine which tokens have been minted, not burned, and require indexing.
    const shouldIndex: Array<string> = [];
    (
      await this._contract.getPastEvents("Transfer", {
        filter: { from: "0x0000000000000000000000000000000000000000" },
        fromBlock: 0
      })
    ).forEach((event) => {
      const tokenId = event.returnValues.tokenId;
      if (!burned.hasOwnProperty(tokenId)) shouldIndex.push(tokenId);
    });

    console.log(`${shouldIndex.length} titles to index`);

    const tokenMetadatas = [];
    for await (const tokenId of shouldIndex) {
      const data = await this._getTokenMetadata(tokenId);
      if (!!data) tokenMetadatas.push(data);
    }

    try {
      await this._algoliaIndex.saveObjects(serializeTitles(tokenMetadatas));
      console.log("Indexing successful");
    } catch (error) {
      console.error(error);
    }
  }
}

export default Indexer;
