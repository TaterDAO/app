// Import Hardhat extensions
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-abi-exporter";

// Configure the environment variables
import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

// Import Migrations
import m00 from "./tasks/migrations/00";
import m01 from "./tasks/migrations/01";

// Add global flags to migrations
const migrations = [m00, m01];
migrations.forEach((migration) => {
  migration.addFlag("ci", "Is migration being run in CI?");
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  defaultNetwork: "hardhat",
  networks: {
    // Dev: Uncomment to set up Rinkeby
    // rinkeby: {
    //   url: process.env.ALCHEMY_RINKEBY_URI,
    //   chainId: 4,
    //   // During CI testing, private key will not be made available
    //   accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    // },
  },
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 0,
  },
  // Docs: https://github.com/cgewecke/hardhat-gas-reporter
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  abiExporter: {
    path: "../web/src/data",
    runOnCompile: false,
    clear: true,
    flat: false,
    pretty: false,
  },
};
