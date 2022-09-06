// Types
import type { DefenderRelaySenderOptions } from "defender-relay-client/lib/web3/sender";
import type { ApiRelayerParams } from "defender-relay-client/lib/relayer";

import { DefenderRelayProvider } from "defender-relay-client/lib/web3";

type AutotaskRelayerCredentials = {
  /**
   * Internal identifier of the relayer function used by the relay-client
   */
  relayerARN: string;
  /**
   * Internal credentials generated by Defender for communicating with other services
   */
  credentials: string;
};

type RelayerAuthenticationCredentials =
  | AutotaskRelayerCredentials
  | ApiRelayerParams;

class Relayer extends DefenderRelayProvider {
  constructor(
    authentication: RelayerAuthenticationCredentials,
    config: DefenderRelaySenderOptions
  ) {
    super(authentication, config);
  }
}

export default Relayer;
export type { RelayerAuthenticationCredentials };
