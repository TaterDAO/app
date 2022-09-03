// Types
import type { AbiItem } from "web3-utils";
import type {
  Contract as EthContract,
  PastEventOptions,
  EventData
} from "web3-eth-contract";

import ABI_TITLE_READ_ONLY_REPLICA from "../data/abi/contracts/TitleV1_1_ReadOnlyReplica.sol/TitleV1_1_ReadOnlyReplica.json";
import ABI_TITLE from "../data/abi/contracts/TitleV1_1.sol/TitleV1_1.json";

import Provider from "./provider";

type ABI = Array<AbiItem>;

class Contract {
  abi?: ABI;
  address: string;
  provider: Provider;

  _contract: EthContract;

  constructor(address: string, provider: Provider, from?: string) {
    this.address = address;
    this.provider = provider;

    const options: { [key: string]: string } = {};
    if (!!from) options["from"] = from;

    this._contract = new provider.eth.Contract(
      this.abi as ABI,
      address,
      options
    );
  }

  get methods() {
    return this._contract.methods;
  }

  async transfers(config: PastEventOptions): Promise<EventData[]> {
    return this._contract.getPastEvents("Transfer", config);
  }
}

class TitleContract extends Contract {
  abi = ABI_TITLE as ABI;
}

class ReadOnlyReplicaTitleContract extends Contract {
  abi = ABI_TITLE_READ_ONLY_REPLICA as ABI;
}

export { TitleContract, ReadOnlyReplicaTitleContract };
