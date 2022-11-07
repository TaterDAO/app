// Types
import type { RelayerParams } from "defender-relay-client";
import type { AutotaskEvent } from "defender-autotask-utils";

// Package Modules
import Indexer from "../../libs/indexer";
import { ARBITRUM_GOERLI_CONTRACT_ADDRESS } from "../../constants/contracts";

async function handler(event: AutotaskEvent & RelayerParams) {
  const indexer = new Indexer(
    event,
    "arbitrum_goerli",
    ARBITRUM_GOERLI_CONTRACT_ADDRESS
  );
  await indexer.index();
}

// Local Development
if (require.main === module) {
  require("dotenv").config();

  try {
    handler({
      // It's necessary to pass RelayerParams in development.
      apiKey: process.env.ARBITRUM_GOERLI_RELAY_API_KEY as string,
      apiSecret: process.env.ARBITRUM_GOERLI_RELAY_API_SECRET as string,
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
