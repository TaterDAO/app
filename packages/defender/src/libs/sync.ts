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

// =================
// ===== Types =====
// =================

// Originally declared by `defender-autotask-utils` but not publicly exported.
interface FunctionConditionSummary {
  type: "function";
  // Method signature
  signature: string;
  // Arg signature
  args: any[];
  // Triggering Contract Address
  address: string;
  // Args by name
  params: { [key: string]: any };
}

// =====================
// ===== Constants =====
// =====================

const MINT_METHOD_SIG =
  "mint(string,string,string,string,string,string,string,string,string,string,string,string,address)";

// ===================
// ===== Helpers =====
// ===================

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

// =====================
// ===== Main Func =====
// =====================

/**
 * Syncs the triggering transaction to target contract.
 * @param event Signature of the AutoTask that's running the sync.
 * @param targetContractAddress Address of the ReadOnlyReplica contract.
 * @returns void.
 */
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

  console.log(`Relaying ${reason.signature}`);
  console.log("Params", reason.params);

  // Get the address that sent the original transaction
  const trxFrom = triggerEvent.transaction.from;
  console.log(`Original Sender: ${trxFrom}`);

  const contract = new web3.eth.Contract(
    ABI as Array<AbiItem>,
    targetContractAddress
  );

  // If method is mint, it's necessary to use the ReadReplica mint signature
  // and set the `to_` arg equal to the original trx sender.
  let method: CallableFunction;
  const args = reason.args;
  if (reason.signature.startsWith("mint(")) {
    method = contract.methods[MINT_METHOD_SIG];
    args.push(trxFrom);
  } else {
    method = contract.methods[reason.signature];
  }

  const res = await method(...args).send({
    // `msg.sender` will always be relay address.
    from: (await web3.eth.getAccounts())[0]
  });

  console.log(`Trx Response:\n\n${JSON.stringify(res)}`);
}

export default sync;
