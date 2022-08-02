// Types
import type { RelayerParams } from "defender-relay-client";
import type { AutotaskEvent } from "defender-autotask-utils";

// Package Modules
import Indexer from "../../libs/indexer";

async function handler(event: AutotaskEvent & RelayerParams) {
  const indexer = new Indexer(
    event,
    "arbitrum_testnet",
    "0x9724E0A0d2437d519Cea68738180c15d9514f41A"
  );
  await indexer.index();
}

// Local Development
if (require.main === module) {
  require("dotenv").config();

  try {
    handler({
      // It's necessary to pass RelayerParams in development.
      apiKey: process.env.ARBITRUM_TESTNET_RELAY_API_KEY as string,
      apiSecret: process.env.ARBITRUM_TESTNET_RELAY_API_SECRET as string,
      secrets: {
        ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID as string,
        ALGOLIA_ADMIN_KEY: process.env.ALGOLIA_ADMIN_KEY as string
      }
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export { handler };