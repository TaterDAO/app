// Types
import type { Relayer } from "defender-relay-client";
import type { SearchIndex, SearchClient } from "algoliasearch";
import type { ObjectWithObjectID } from "@algolia/client-search";

type IdIndex = { [id: string]: boolean };

class Indexer {
  //@ts-ignore
  private _relayer: Relayer;
  //@ts-ignore
  private _contractAddress: string;
  //@ts-ignore
  private _algoliaClient: SearchClient;
  private _algoliaIndex: SearchIndex;

  constructor(
    relayer: Relayer,
    networkId: string,
    contractAddress: string,
    algoliaClient: SearchClient
  ) {
    this._relayer = relayer;
    this._contractAddress = contractAddress;
    this._algoliaClient = algoliaClient;
    this._algoliaIndex = algoliaClient.initIndex(`titles-${networkId}`);
  }

  /**
   * Loads records from Algolia.
   */
  private async _loadRecords(): Promise<Array<ObjectWithObjectID>> {
    return new Promise(async (resolve) => {
      await this._algoliaIndex.browseObjects({
        query: "",
        batch: (hits) => {
          resolve(hits as Array<ObjectWithObjectID>);
        }
      });
    });
  }

  public async index() {
    console.log("Indexing");

    // Query records already indexed by Algolia; these will be used to determine
    // which Titles have been burned - they'll exist in Algolia but not in the contract.
    const indexedRecords = await this._loadRecords();
    const indexedRecordIds = indexedRecords.reduce(
      (memo: IdIndex, record) => ({
        ...memo,
        [record.objectID]: true
      }),
      {}
    );

    console.log(indexedRecordIds);
  }
}

export default Indexer;
