// Type
import type { AutotaskEvent } from "defender-autotask-utils";

// Package Modules
import sync from "../../libs/sync";

const handler = async function (event: AutotaskEvent) {
  await sync(event, "0x9B0b70eDaa3b6Ae70389d8514ED65AcD86386ef2");
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
