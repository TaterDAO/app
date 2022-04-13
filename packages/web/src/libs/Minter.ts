// Types
import Web3 from "web3";
import type { TransactionReceipt, EventLog } from "web3-core";

// Data
import ABI from "@data/contracts/TitleV1_0.sol/TitleV1_0.json";
import addresses from "@data/addresses.json";

// Libs
import { toast } from "react-toastify";

const { localhost, rinkeby, mainnet } = addresses as {
  localhost?: string;
  rinkeby?: string;
  mainnet?: string;
};

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

    let address = "";

    if (localhost && chainId === 31337) address = localhost;
    else if (rinkeby && chainId === 4) address = rinkeby;
    else if (mainnet && chainId === 1) address = mainnet;
    else throw new Error("Unsupported chain!");

    this._contract = new this._web3.eth.Contract(
      //@ts-expect-error
      ABI,
      address
    );

    this._chainId = chainId;
  }

  async handleError(error: any, receipt: object) {
    toast.error(error);
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
