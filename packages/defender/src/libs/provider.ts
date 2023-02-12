import Web3 from "web3";
import Relayer from "./relayer";

class Provider extends Web3 {
  // Typically the relayer address.
  _fromAddress?: string;

  constructor(relayer: Relayer) {
    super(relayer);
  }

  async fromAddress() {
    if (!!this._fromAddress) return this._fromAddress;
    this._fromAddress = (await this.eth.getAccounts())[0];
    return this._fromAddress;
  }
}

export default Provider;
