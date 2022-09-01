// Types
import type {
  AutotaskEvent,
  SentinelTriggerEvent,
  BlockTriggerEvent
} from "defender-autotask-utils";
import type { AbiItem } from "web3-utils";

// Package Modules
import { typeCastSignatureArgs } from "../utils/contract";
import web3Provider from "../services/web3";
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
 * Determines whether sync should occur based on whether
 * triggering event is a `SentinelTriggerEvent`.
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

  console.log(`Target Contract: ${targetContractAddress}`);

  // Type reason
  reason as FunctionConditionSummary;

  console.log(`Relaying ${reason.signature}`);
  console.log("Params", reason.params);

  // Get the address that sent the original transaction
  const trxFrom = triggerEvent.transaction.from;
  console.log(`Original Sender: ${trxFrom}`);

  const web3 = web3Provider(
    event.credentials as string,
    event.relayerARN as string
  );

  const contract = new web3.eth.Contract(
    ABI as Array<AbiItem>,
    targetContractAddress
  );

  // Prepare the transaction.
  let trx: any;
  if (reason.signature.startsWith("mint(")) {
    // If method is mint, it's necessary to use the ReadReplica mint signature.  This contains an additional `to_` argument:
    // an address that the token should be minted to. It is appended to the args array with the original trx sender's address.
    trx = contract.methods[MINT_METHOD_SIG](
      ...typeCastSignatureArgs(MINT_METHOD_SIG, [...reason.args, trxFrom])
    );
  } else {
    trx = contract.methods[reason.signature](
      ...typeCastSignatureArgs(reason.signature, reason.args)
    );
  }

  console.log("Syncing");

  const res = await trx.send({
    // `msg.sender` will always be relay address.
    from: (await web3.eth.getAccounts())[0]
  });

  console.log(`Trx Response:\n\n${JSON.stringify(res)}`);
}

export default sync;
