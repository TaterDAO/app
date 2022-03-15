// Constants
import { ContractIds, CONSTRUCTOR_METHODS } from "../constants/Contracts";

// ABIs
import TitleV1_0 from "../data/contracts/TitleV1_0.sol/TitleV1_0.json";

// Types
import type { AbiItem, AbiInput } from "web3-utils/types";
import type Web3 from "web3";
import type { Args, Returns } from "@T/Contract";

type Methods = { [name: string]: (...args: any[]) => Promise<void> };

const abiMap: any = {
  [ContractIds.TitleV1_0]: TitleV1_0
};

class ContractAPI {
  public methods: Methods;
  private _abi: Array<AbiItem>;

  constructor(
    web3: Web3,
    id: ContractIds,
    contractAddress: string,
    senderAddress: string
  ) {
    this._abi = abiMap[id];
    const contract = new web3.eth.Contract(this._abi, contractAddress);

    this.methods = this._abi.reduce((memo: Methods, abi: AbiItem) => {
      const name = abi.name as string;
      const inputs = abi.inputs as Array<AbiInput>;

      return CONSTRUCTOR_METHODS.includes(name)
        ? memo
        : {
            ...memo,
            [name]: async function (...args: any[]) {
              // Validate args
              if (inputs.length !== args.length) {
                throw new Error(
                  `#${name} was called with ${args.length} args; expects ${inputs.length}.`
                );
              } else {
                inputs.forEach((input, index) => {
                  const argType = typeof args[index];
                  if (input.type !== argType) {
                    throw new Error(
                      `#${name} arg (${input.name}: ${input.type}) was passed ${argType}.`
                    );
                  }
                });
              }

              const { send, call } = contract.methods[name](...args);
              const method = inputs.length === 0 ? call : send;
              return await method({ from: senderAddress });
            }
          };
    }, {});
  }

  /**
   * Returns a given method's args and return types
   * @param name Method name
   * @returns Method's args and returns.
   */
  public getMethodSignature(name: string): {
    args: Args;
    returns: Returns;
  } {
    const method = this._abi.find((item) => item.name === name);
    if (!method) throw new Error("Method does not exist");

    return {
      args:
        method.inputs?.map((input) => ({
          name: input.name,
          type: input.type
        })) || [],
      returns:
        method.outputs?.map((output) => ({
          name: output.name,
          type: output.type
        })) || []
    };
  }
}

export default ContractAPI;
