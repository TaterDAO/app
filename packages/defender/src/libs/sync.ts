// Types
import type {
  AutotaskEvent,
  SentinelTriggerEvent,
  BlockTriggerEvent,
  SentinelConditionSummary
} from "defender-autotask-utils";
import type Provider from "../libs/provider";
import type { RelayerAuthenticationCredentials } from "../libs/relayer";

// Package Modules
import { typeCastSignatureArgs } from "../utils/contract";
import web3Provider from "../services/web3";
import { ReadOnlyReplicaTitleContract } from "../libs/contracts";

// =================
// ===== Types =====
// =================

type Params = { [key: string]: any };

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
  params: Params;
}

// =====================
// ===== Constants =====
// =====================

const MINT_METHOD_SIG =
  "mint(string,string,string,string,string,string,string,string,string,string,string,string,address)";

class Syncer {
  // Replica Relayer Provider
  provider: Provider;
  contract: ReadOnlyReplicaTitleContract;
  relayAddress?: string;
  _setup: boolean = false;

  constructor(
    targetContractAddress: string,
    syncerCredentials: RelayerAuthenticationCredentials
  ) {
    this.provider = web3Provider(syncerCredentials);
    this.contract = new ReadOnlyReplicaTitleContract(
      targetContractAddress,
      this.provider
    );
  }

  async setup() {
    this.relayAddress = await this.provider.fromAddress();
    this._setup = true;
  }

  /**
   * Syncs the triggering transaction to target contract.
   */
  async run(
    methodSignature: string,
    args: Array<string> = [],
    trxFromAddress: string
  ) {
    if (!this._setup) throw new Error("Must call #setup first");
    console.log("Syncing");

    // Prepare the transaction.
    let trx: any;
    if (methodSignature.startsWith("mint(")) {
      // If method is mint, it's necessary to use the ReadReplica mint signature.  This contains an additional `to_` argument:
      // an address that the token should be minted to. It is appended to the args array with the original trx sender's address.
      trx = this.contract.methods[MINT_METHOD_SIG](
        ...typeCastSignatureArgs(MINT_METHOD_SIG, [...args, trxFromAddress])
      );
    } else {
      trx = this.contract.methods[methodSignature](
        ...typeCastSignatureArgs(methodSignature, args)
      );
    }

    // `msg.sender` will always be relay address.
    const res = await trx.send({ from: this.relayAddress });

    console.log(`Trx Response:\n\n${JSON.stringify(res)}`);
  }
}

/**
 * Determines whether sync should occur based on whether
 * triggering event is a `SentinelTriggerEvent`.
 * @param event {AutotaskEvent} Event that triggered the Autotask
 * @returns {boolean} Is sentinel trigger event?
 */
function isSentinelTriggerEvent(event: AutotaskEvent): boolean {
  const data = event.request?.body;
  return (
    !!data &&
    data.hasOwnProperty("type") &&
    (data as SentinelTriggerEvent).type === "BLOCK"
  );
}

/**
 * Autotask should only be triggered by Autotask functions.
 * @returns {boolean} Is function trigger?
 */
function isFunctionTrigger(reason: SentinelConditionSummary): boolean {
  return reason.type === "function";
}

/**
 * Routine for verifying whether sync should be run and subsequently running sync.
 * Should be called within an Autotask lambda handler.
 */
async function autotaskSync(
  targetContractAddress: string,
  event: AutotaskEvent
) {
  if (!isSentinelTriggerEvent(event)) return;

  const triggerEvent = event.request?.body as BlockTriggerEvent;
  let [reason] = triggerEvent.matchReasons;

  if (!isFunctionTrigger(reason)) return;

  const s = new Syncer(targetContractAddress, {
    relayerARN: event.relayerARN as string,
    credentials: event.credentials as string
  });
  await s.setup();

  const { signature, args } = reason as FunctionConditionSummary;
  await s.run(signature, args, triggerEvent.transaction.from);
}

export { Syncer, autotaskSync };
