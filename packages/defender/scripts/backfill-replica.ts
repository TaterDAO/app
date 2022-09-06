// Types
import type { AbiItem } from "web3-utils";
type AbiItems = Array<AbiItem>;
import type { RawMetadata } from "../src/types/contract";

// 3rd Party Libs
//import axios from "axios";
import { config } from "dotenv";

// CONFIG: Load environment variables then package modules.

config();

import {
  ARBITRUM_TESTNET_CONTRACT_ADDRESS,
  ARBITRUM_ONE_CONTRACT_ADDRESS,
  GOERLI_REPLICA_CONTRACT_ADDRESS,
  MAINNET_REPLICA_CONTRACT_ADDRESS
} from "../src/constants/contracts";

import web3Provider from "../src/services/web3";
import { decodeMetadata } from "../src/utils/contract";
import { Syncer } from "../src/libs/sync";
import Provider from "../src/libs/provider";
import {
  TitleContract,
  ReadOnlyReplicaTitleContract
} from "../src/libs/contracts";

import ABI_TitleV1_1 from "../src/data/abi/contracts/TitleV1_1.sol/TitleV1_1.json";

// CONFIG: Define how chains should synced.

interface BaseNetworkInterface {
  contractAddress: string;
  contractDeploymentBlock: number;
  relay: {
    apiKey: string;
    apiSecret: string;
  };
}

interface SourceNetworkInterface extends BaseNetworkInterface {
  contractABI: AbiItems;
}

interface ReplicaNetworkInterface extends BaseNetworkInterface {}

interface NetworkPair {
  source: SourceNetworkInterface;
  replica: ReplicaNetworkInterface;
}

const networkPairs: { [id: string]: NetworkPair } = {
  test: {
    source: {
      contractAddress: ARBITRUM_TESTNET_CONTRACT_ADDRESS,
      contractABI: ABI_TitleV1_1 as AbiItems,
      contractDeploymentBlock: 12057052,
      relay: {
        apiKey: process.env.ARBITRUM_TESTNET_RELAY_API_KEY as string,
        apiSecret: process.env.ARBITRUM_TESTNET_RELAY_API_SECRET as string
      }
    },
    replica: {
      contractAddress: GOERLI_REPLICA_CONTRACT_ADDRESS,
      contractDeploymentBlock: 0,
      relay: {
        apiKey: process.env.ETHEREUM_GOERLI_RELAY_API_KEY as string,
        apiSecret: process.env.ETHEREUM_GOERLI_RELAY_API_SECRET as string
      }
    }
  },
  prod: {
    source: {
      contractAddress: ARBITRUM_ONE_CONTRACT_ADDRESS,
      contractABI: ABI_TitleV1_1 as AbiItems,
      contractDeploymentBlock: 13644033,
      relay: {
        apiKey: process.env.ARBITRUM_ONE_RELAY_API_KEY as string,
        apiSecret: process.env.ARBITRUM_ONE_RELAY_API_SECRET as string
      }
    },
    replica: {
      contractAddress: MAINNET_REPLICA_CONTRACT_ADDRESS,
      contractDeploymentBlock: 15485986,
      relay: {
        apiKey: process.env.ETHEREUM_MAINNET_RELAY_API_KEY as string,
        apiSecret: process.env.ETHEREUM_MAINNET_RELAY_API_SECRET as string
      }
    }
  }
};

// CONFIG: Type Definitions

enum TransferType {
  MINT = "MINT",
  BURN = "BURN"
}

type StateMutation = {
  blockNumber: number;
  tokenId: string;
  owner: string;
  type: TransferType;
};

// HELPERS

class Routine {
  source: SourceNetworkInterface;
  replica: ReplicaNetworkInterface;

  sourceProvider: Provider;
  replicaProvider: Provider;
  sourceFrom: string | undefined = undefined;

  syncer?: Syncer;

  //@ts-ignore
  sourceContract: TitleContract;
  replicaContract: ReadOnlyReplicaTitleContract;

  constructor(networkPairId: string) {
    const pair = networkPairs[networkPairId];
    if (!pair) {
      throw new Error("Bad Pair ID; select from {test | prod}");
    }

    this.source = pair.source;
    this.replica = pair.replica;

    this.sourceProvider = web3Provider(this.source.relay);
    this.replicaProvider = web3Provider(this.replica.relay);

    this.replicaContract = new ReadOnlyReplicaTitleContract(
      this.replica.contractAddress,
      this.replicaProvider
    );
  }

  async setup() {
    this.sourceFrom = await this.sourceProvider.fromAddress();

    this.sourceContract = new TitleContract(
      this.source.contractAddress,
      this.sourceProvider,
      this.sourceFrom
    );
  }

  async makeStateMutations(
    contract: TitleContract | ReadOnlyReplicaTitleContract,
    deploymentBlock: number
  ): Promise<Array<StateMutation>> {
    const sourceMintEvents = (
      await contract.transfers({
        filter: { from: "0x0000000000000000000000000000000000000000" },
        fromBlock: deploymentBlock
      })
    ).map((event) => ({
      blockNumber: event.blockNumber,
      tokenId: event.returnValues.tokenId,
      owner: event.returnValues.to,
      type: TransferType.MINT
    }));

    // SOURCE STATE: query burns
    const sourceBurnEvents = (
      await contract.transfers({
        filter: { to: "0x0000000000000000000000000000000000000000" },
        fromBlock: deploymentBlock
      })
    ).map((event) => ({
      blockNumber: event.blockNumber,
      tokenId: event.returnValues.tokenId,
      owner: event.returnValues.from,
      type: TransferType.BURN
    }));

    // SOURCE STATE: Merge transfer events into a single array of state mutations sorted by blocknumber
    // from oldest to newest (ascending order).
    return [...sourceMintEvents, ...sourceBurnEvents].sort(
      (a, b) => a.blockNumber - b.blockNumber
    );
  }

  /**
   * Determines which source mutations are yet-to-be-applied to replica state. Does so
   * by looking at the difference in length between the source and replica arrays and returning
   * all source events after the last replica event index.
   * Note: Mutation content is ignored.
   * @param sourceMutations All source state mutations.
   * @param replicaMutations State mutations already applied to replica state.
   * @returns Mutations that have not yet been applied.
   */
  filterAppliedMutations(
    sourceMutations: Array<StateMutation>,
    replicaMutations: Array<StateMutation>
  ): Array<StateMutation> {
    return sourceMutations.slice(replicaMutations.length);
  }

  /**
   * Exposes the provider's JSON RPC relayer.
   */
  get sourceRelayer() {
    //@ts-ignore
    return this.sourceProvider.currentProvider.base.relayer;
  }

  private async _fetchTokenMetadata(
    tokenId: string
  ): Promise<RawMetadata | null> {
    try {
      // Bugfix: Directly call the relayer.  Otherwise the combination of Web3.js and the Defender Relay Client
      // causes error messages to be passed into an event emitter that results in an uncaught exception.
      //@ts-ignore
      const res = await this.sourceRelayer.call("eth_call", [
        {
          data: this.sourceContract.methods
            .tokenURI(parseInt(tokenId))
            .encodeABI(),
          from: this.sourceFrom,
          gas: undefined,
          gasPrice: undefined,
          to: this.source.contractAddress
        },
        "latest"
      ]);
      if (res.result) {
        return decodeMetadata(this.sourceProvider.utils.toAscii(res.result));
      } else if (
        res.error.message ===
        "execution reverted: ERC721Metadata: URI query for nonexistent token"
      ) {
        return null;
      } else {
        throw res.error;
      }
    } catch (error) {
      throw error;
    }
  }

  async applyMutations(mutations: Array<StateMutation>): Promise<void> {
    const s = new Syncer(this.replica.contractAddress, this.replica.relay);
    await s.setup();

    for await (const mutation of mutations) {
      if (mutation.type === TransferType.MINT) {
        const metadata = await this._fetchTokenMetadata(mutation.tokenId);

        await s.run(
          "mint(string,string,string,string,string,string,string,string,string,string,string,string)",
          // Compile placeholder data. It is necessary to send the mint transaction in order
          // to increment the token ids.
          Object.values({
            name_: metadata?.name || "",
            description_: metadata?.description || "",
            externalUrl_: metadata?.external_url || "",
            image_: metadata?.image || "",
            attrLandClassification_: metadata?.attributes[0].value || "",
            attrLocation_: metadata?.attributes[1].value || "",
            attrDeed_: metadata?.attributes[2].value || "",
            attrParcels_: metadata?.attributes[3].value || "",
            attrOwner_: metadata?.attributes[4].value || "",
            attrKml_: metadata?.attributes[5].value || "",
            attrTag_: metadata?.attributes[6].value || "",
            attrBuildingClassification_: metadata?.attributes[9].value || ""
          }),
          mutation.owner
        );
      } else if (mutation.type === TransferType.BURN) {
        await s.run("burn(uint256)", [mutation.tokenId], mutation.owner);
      } else {
        throw new Error(`Bad transfer type: ${mutation.type}`);
      }
    }
  }
}

// RUN: Main Routine.

(async () => {
  // CONFIG: Read which network pair to use
  const args = process.argv.slice(2);
  const networkPairId = args[0];

  if (!Boolean(networkPairId))
    throw new Error("Network Pair ID argument required");

  // SETUP

  const routine = new Routine(networkPairId);
  await routine.setup();

  // Query source mutations, replica mutations, and filter out source mutations
  // which have already been applied.

  const sourceMutations = await routine.makeStateMutations(
    routine.sourceContract,
    routine.source.contractDeploymentBlock
  );

  const replicaMutations = await routine.makeStateMutations(
    routine.replicaContract,
    routine.replica.contractDeploymentBlock
  );

  const mutationsToApply = routine.filterAppliedMutations(
    sourceMutations,
    replicaMutations
  );

  console.log(`${mutationsToApply.length} mutations to apply`);

  // if (mutationsToApply.length > 0) {
  //   await routine.applyMutations(mutationsToApply);
  // }
})();
