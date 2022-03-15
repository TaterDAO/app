// Types
import type { Web3Provider } from "@ethersproject/providers";

/**
 * Helper class for managing Hardhat's EVM state.
 */
class EVM {
  private _provider: Web3Provider;
  private _snapshotId: string = "";

  constructor(provider: Web3Provider) {
    this._provider = provider;
  }

  /**
   * @name snapshot
   * @description Snapshots the current EVM state and scopes the snapshot id
   * to the class.
   */
  public async snapshot() {
    this._snapshotId = await this._provider.send("evm_snapshot", []);
  }

  /**
   * @name revert
   * @description Reverts the EVM state to the last snapshot id.
   */
  public async revert() {
    await this._provider.send("evm_revert", [this._snapshotId]);
  }
}

export default EVM;
