// Types
import type { AutotaskEvent } from "defender-autotask-utils";
import type { DefenderRelaySenderOptions } from "defender-relay-client/lib/web3/sender";
import type { ApiRelayerParams } from "defender-relay-client/lib/relayer";

// 3rd Party Modules
import { DefenderRelayProvider } from "defender-relay-client/lib/web3";
import { default as Web3 } from "web3";

/**
 * Creates new Web3 instance using a given OpenZeppelin Defender Relayer as provider.  All transactions
 * will originate from the Relayer.
 * @param event AutotaskEvent, or if in local development, an object containing API key and secret.
 * @param config Provider options.
 * @returns {Web3} Web3 Instance.
 */
function web3Provider(
  event: AutotaskEvent | ApiRelayerParams,
  config: DefenderRelaySenderOptions = { speed: "average" }
): Web3 {
  // @ts-ignore: DefenderRelayProvider is incorrectly typed and excludes ApiRelayerParams.
  return new Web3(new DefenderRelayProvider(event, config));
}

export default web3Provider;
