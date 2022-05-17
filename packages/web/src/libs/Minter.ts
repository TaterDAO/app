// Types
import Web3 from "web3";
import type { TransactionReceipt, EventLog } from "web3-core";

// Data
import ABI from "@data/contracts/TitleV1_0.sol/TitleV1_0.json";
import supportedNetworks from "@configs/networks";

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

    const chainInfo = supportedNetworks[chainId as number];
    if (!chainInfo) return;

    this._contract = new this._web3.eth.Contract(
      //@ts-expect-error
      ABI,
      chainInfo.contract.address
    );
  }

  /**
   * Calls Mint.
   * @returns Transaction Hash once its been submitted to the chain
   */
  async mint(values: any, fromAddress: string): Promise<void> {
    await this._contract.methods
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
      .send({ from: fromAddress });
  }
}

export default Minter;
export { Events };
