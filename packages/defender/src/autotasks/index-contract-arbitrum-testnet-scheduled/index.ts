// Types
import type { RelayerParams } from "defender-relay-client";
import type { AutotaskEvent } from "defender-autotask-utils";

// 3rd Party Modules
import { Relayer } from "defender-relay-client";

// Package Modules
import Indexer from "../../libs/indexer";
import makeAlgoliaClient from "../../services/algolia";

async function handler(event: AutotaskEvent & RelayerParams) {
  const indexer = new Indexer(
    new Relayer(event),
    "arbitrum_testnet",
    "0x9724E0A0d2437d519Cea68738180c15d9514f41A",
    makeAlgoliaClient(
      event.secrets?.ALGOLIA_APPLICATION_ID as string,
      event.secrets?.ALGOLIA_ADMIN_KEY as string
    )
  );
  await indexer.index();
}

// Local Development
if (require.main === module) {
  require("dotenv").config();

  try {
    handler({
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
