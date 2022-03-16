// Types
import type Web3 from "web3";

// Data
import ABI from "@data/contracts/TitleV1_0.sol/TitleV1_0.json";
import addresses from "@data/addresses.json";

const { localhost, rinkeby, mainnet } = addresses as {
  localhost?: string;
  rinkeby?: string;
  mainnet?: string;
};

class Minter {
  private _web3: Web3;
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
  }

  async mint(values: any, fromAddress: string): Promise<string> {
    const { transactionHash } = await this._contract.methods
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
    return transactionHash as string;
  }
}

export default Minter;
