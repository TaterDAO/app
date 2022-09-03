// Type
import type { AutotaskEvent } from "defender-autotask-utils";

// Package Modules
import { autotaskSync } from "../../libs/sync";
import { GOERLI_REPLICA_CONTRACT_ADDRESS } from "../../constants/contracts";

const handler = async function (event: AutotaskEvent) {
  await autotaskSync(GOERLI_REPLICA_CONTRACT_ADDRESS, event);
};

// Local Development
if (require.main === module) {
  require("dotenv").config();

  try {
    // handler({
    //   // It's necessary to pass RelayerParams in development.
    //   //apiKey: process.env.ETHEREUM_GOERLI_RELAY_API_KEY as string,
    //   //apiSecret: process.env.ETHEREUM_GOERLI_RELAY_API_SECRET as string
    // });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export { handler };
