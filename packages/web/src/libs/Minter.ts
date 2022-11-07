// Types
import Web3 from "web3";

// Data
import ABI from "@data/contracts/TitleV1_1.sol/TitleV1_1.json";

// Utils
import { getChainConfig } from "@utils/chain";

enum Events {
  Receipt = "receipt",
  Confirmation = "confirmation",
  Error = "error"
}

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

  async burn(tokenId: number, fromAddress: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._contract.methods
        .burn(tokenId)
        .send({ from: fromAddress })
        .on("error", reject)
        .on("transactionHash", resolve);
    });
  }

  /**
   * Calls Mint.
   * @param values Tater metadata.
   * @param fromAddress Sender address.
   * @param estimate Estimate gas instead of submitting the transaction?
   * @returns Transaction Hash once its been submitted to the chain
   */
  async mint(
    values: any,
    fromAddress: string,
    estimate: boolean = true
  ): Promise<string> {
    const call = this._contract.methods.mint(
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
      values.attrTag_,
      values.attrBuildingClassification_
    );
    const options = { from: fromAddress };

    return new Promise(async (resolve, reject) => {
      if (estimate) {
        try {
          return await call.estimateGas(options);
        } catch (error) {
          reject(error);
        }
      } else {
        call.send(options).on("error", reject).on("transactionHash", resolve);
      }
    });
  }
}

export default Minter;
export { Events };
