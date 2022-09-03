import Web3 from "web3";
import Relayer from "./relayer";

class Provider extends Web3 {
  constructor(relayer: Relayer) {
    super(relayer);
  }
}

export default Provider;
