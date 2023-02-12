// Types
import type { AutotaskEvent } from "defender-autotask-utils";
import type { RelayerParams } from "defender-relay-client";
import type { SearchIndex, SearchClient } from "algoliasearch";
import type { ObjectWithObjectID } from "@algolia/client-search";
import type { RawMetadata } from "../../types/contract";
import type Provider from "../../libs/provider";

// Package modules
import { TitleContract } from "../contracts";
import makeAlgoliaClient, { serializeTitles } from "../../services/algolia";
import { decodeMetadata } from "../../utils/contract";
import web3Provider from "../../services/web3";

// Types
type AlgoliaRecordsById = { [id: string]: ObjectWithObjectID };

class Indexer {
  // Contract
  private provider: Provider;
  private _contract: TitleContract;

  // Algolia
  private _algoliaClient: SearchClient;
  private _algoliaIndex: SearchIndex;

  constructor(
    event: AutotaskEvent & RelayerParams,
    networkId: string,
    contractAddress: string
  ) {
    this.provider = web3Provider(event);
    this._contract = new TitleContract(contractAddress, this.provider);

    this._algoliaClient = makeAlgoliaClient(
      event.secrets?.ALGOLIA_APPLICATION_ID as string,
      event.secrets?.ALGOLIA_ADMIN_KEY as string
    );
    this._algoliaIndex = this._algoliaClient.initIndex(`titles-${networkId}`);
  }

  private async _from(): Promise<string> {
    return await this.provider.fromAddress();
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
   * Which blocks should be indexed?
   * When querying events, we start from a block some reasonable number
   * behind the current block; otherwise the query will timeout. Moreover,
   * because the Indexer is intended to be run periodically, all blocks prior to
   * our starting block should already have been indexed.
   * @returns Block number
   */
  private async _blockRange(): Promise<{
    fromBlock: number;
    toBlock: number;
  }> {
    const range = 1000;
    const currentBlockNumber = await this.provider.eth.getBlockNumber();
    return {
      fromBlock: currentBlockNumber - range,
      toBlock: currentBlockNumber
    };
  }

  /**
   * Index the contract into Algolia.
   */
  public async index() {
    console.log("Indexing");

    // Determine which block to query from
    const blockRange = await this._blockRange();

    // BURNING: Query records already indexed by Algolia; these will be used to determine
    // which Titles have been burned - they'll exist in Algolia but not in the contract.
    const indexedRecords = await this._loadRecords();

    // BURNING: Query burn events and update map
    const requiresDeIndexing: { [id: string]: boolean } = {};
    const burned: { [id: string]: boolean } = {};
    (
      await this._contract.transfers({
        filter: { to: "0x0000000000000000000000000000000000000000" },
        ...blockRange
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
        await this._algoliaIndex.deleteObjects(requiresDeIndexingArray);
        console.log("De-Indexing successful");
      } catch (error) {
        console.error(error);
      }
    }

    // MINTING: Determine which tokens have been minted, not burned, and require indexing.
    const shouldIndex: Array<string> = [];
    (
      await this._contract.transfers({
        filter: { from: "0x0000000000000000000000000000000000000000" },
        ...blockRange
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
