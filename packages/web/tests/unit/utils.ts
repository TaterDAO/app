import type { HttpProvider } from "web3-core";

interface JsonRpcResponse {
  jsonrpc: string;
  id: number;
  result: string;
}

/**
 * Helper class for interacting with the Hardhat EVM during testing.
 * It is useful for resetting the chain-state back to a pre-defined baseline
 * after each test case.
 */
class EVM {
  private _nextId: number = 1;
  private _provider: HttpProvider;
  private _snapshotId: string = "";

  constructor(provider: HttpProvider) {
    this._provider = provider;
  }

  private async _send(
    method: string,
    params: Array<any> = []
  ): Promise<JsonRpcResponse> {
    return new Promise((resolve, reject) => {
      this._provider.send(
        {
          jsonrpc: "2.0",
          method,
          params,
          id: this._nextId++
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as JsonRpcResponse);
        }
      );
    });
  }

  public async snapshot() {
    const { result } = await this._send("evm_snapshot", []);
    this._snapshotId = result;
  }

  public async revert() {
    await this._send("evm_revert", [this._snapshotId]);
  }
}

export { EVM };
