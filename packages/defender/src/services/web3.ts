// Types
import type { DefenderRelaySenderOptions } from "defender-relay-client/lib/web3/sender";
import type { RelayerAuthenticationCredentials } from "../libs/relayer";

import Relayer from "../libs/relayer";
import Provider from "../libs/provider";

/**
 * Creates new Web3 instance using a given OpenZeppelin Defender Relayer as provider.  All transactions
 * will originate from the Relayer.
 * @param event AutotaskEvent, or if in local development, an object containing API key and secret.
 * @param config Provider options.
 * @returns {Web3} Web3 Instance.
 */
function web3Provider(
  event: RelayerAuthenticationCredentials,
  config: DefenderRelaySenderOptions = { speed: "average" }
): Provider {
  const relayer = new Relayer(event, config);
  return new Provider(relayer);
}

export default web3Provider;
