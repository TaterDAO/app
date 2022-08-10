// Types
import type {
  AutotaskEvent,
  SentinelTriggerEvent,
  BlockTriggerEvent
} from "defender-autotask-utils";
import type { AutotaskRelayerParams } from "defender-relay-client";
import type { AbiItem } from "web3-utils";

// 3rd Party Modules
import { DefenderRelayProvider } from "defender-relay-client/lib/web3";
import Web3 from "web3";

// Package Modules
import ABI from "../data/abi/contracts/TitleV1_1_ReadOnlyReplica.sol/TitleV1_1_ReadOnlyReplica.json";

// Originally declared by `defender-autotask-utils` but not publicly exported.
interface FunctionConditionSummary {
  type: "function";
  signature: string;
  args: any[];
  address: string;
  params: {
    [key: string]: any;
  };
}

/**
 * Determines whether sync should occur. Returns boolean corresponding to
 * where the triggering event is a `SentinelTriggerEvent`.
 * @param event {AutotaskEvent} Event that triggered the Autotask
 * @returns {boolean} Should trigger?
 */
function shouldEventTriggerSync(event: AutotaskEvent): boolean {
  const data = event.request?.body;
  return (
    !!data &&
    data.hasOwnProperty("type") &&
    (data as SentinelTriggerEvent).type === "BLOCK"
  );
}

async function sync(
  event: AutotaskEvent,
  targetContractAddress: string
): Promise<void> {
  if (!shouldEventTriggerSync(event)) return;

  const triggerEvent = event.request?.body as BlockTriggerEvent;
  const [reason] = triggerEvent.matchReasons;

  // Should only be triggered by functions
  if (reason.type !== "function") {
    console.log("Non-function Trigger");
    return;
  }

  // Type reason
  reason as FunctionConditionSummary;

  const web3 = new Web3(
    new DefenderRelayProvider(
      {
        credentials: event.credentials as string,
        relayerARN: event.relayerARN as string
      } as AutotaskRelayerParams,
      { speed: "average" }
    )
  );

  console.log(`Relaying ${reason.signature} with args: ${reason.args}`);

  const contract = new web3.eth.Contract(
    ABI as Array<AbiItem>,
    targetContractAddress
  );
  const method = contract.methods[reason.signature];
  const [from] = await web3.eth.getAccounts();
  const res = await method(...reason.args).send({ from });

  console.log(`Trx Response:\n\n${JSON.stringify(res)}`);
}

export default sync;
