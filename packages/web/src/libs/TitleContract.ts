// Types
import type { AbiItem } from "web3-utils";

// Data
import abi from "@data/contracts/TitleV1_0.sol/TitleV1_0.json";

// Libs
import Web3 from "web3";

// Utils
import { getChainConfig } from "@utils/chain";

// Hardcode for now
const FROM = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";

const defaultTrxConfig = {
  from: FROM
};

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

class TitleContract {
  private _web3: Web3;
  private _contract: any;

  constructor(chainId: number) {
    const chainConfig = getChainConfig(chainId);

    this._web3 = new Web3(chainConfig?.rpc.endpoint as string);
    this._contract = new this._web3.eth.Contract(
      abi as Array<AbiItem>,
      chainConfig?.contract.address as string
    );
  }

  async getData(tokenId: number): Promise<any | null> {
    const res: string = await this._contract.methods
      .tokenURI(tokenId)
      .call(defaultTrxConfig);
    return decodeMetadata(res);
  }

  async getOwner(tokenId: number): Promise<string> {
    const res: string = await this._contract.methods
      .ownerOf(tokenId)
      .call(defaultTrxConfig);
    return res.toLowerCase();
  }
}

export default TitleContract;
