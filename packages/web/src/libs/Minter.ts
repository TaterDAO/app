// Types
import Web3 from "web3";
import type { TransactionReceipt, EventLog } from "web3-core";

// Data
import ABI from "@data/contracts/TitleV1_0.sol/TitleV1_0.json";

// Utils
import { getChainConfig } from "@utils/chain";

// Libs
import { toast } from "react-toastify";

enum Events {
  Receipt = "receipt",
  Confirmation = "confirmation",
  Error = "error"
}

type EventsLog = {
  [eventName: string]: EventLog;
};

class Minter {
  private _web3: Web3;
  private _chainId: number;
  //@ts-ignore
  private _contract: Web3.Eth.Contract;

  constructor(web3: Web3, chainId: number) {
    this._web3 = web3;
    this._chainId = chainId;

    this._contract = new this._web3.eth.Contract(
      //@ts-expect-error
      ABI,
      getChainConfig(chainId)?.contract.address
    );
  }

  async handleError(error: any, receipt: object) {
    throw error;
  }

  async burn(tokenId: number, fromAddress: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._contract.methods
        .burn(tokenId)
        .send({ from: fromAddress })
        .on("transactionHash", resolve)
        .on("receipt", async (receipt: TransactionReceipt) => {
          navigator.sendBeacon(
            `/api/burn?chainId=${this._chainId}&tokenId=${tokenId}`
          );
        })
        .on("error", this.handleError);
    });
  }

  /**
   * Calls Mint.
   * @returns Transaction Hash once its been submitted to the chain
   */
  async mint(values: any, fromAddress: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this._contract.methods
        .mint(
          values.name_,
          values.description_,
          values.externalUrl_,
          values.image_,
          values.attrLandClassification_,
          values.attrLocation_,
          values.attrDeed_,
          values.attrParcels_,
          values.attrOwner_,
          values.attrKml_,
          values.attrTag_
        )
        .send({ from: fromAddress })
        .on("transactionHash", resolve)
        .on("receipt", async (receipt: TransactionReceipt) => {
          const tokenId = (receipt.events as EventsLog).Transfer.returnValues
            .tokenId as string;
          navigator.sendBeacon(
            `/api/indexContract?chainId=${this._chainId}&tokenId=${tokenId}`
          );
        })
        .on("error", this.handleError);
    });
  }
}

export default Minter;
export { Events };
