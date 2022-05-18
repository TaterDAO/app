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

const {
  PRIVATE_KEY,
  ALCHEMY_RINKEBY_URI,
  ALCHEMY_ARBITRUM_TESTNET_URI,
  REPORT_GAS,
  ETHERSCAN_API_KEY,
  COINMARKETCAP_API_KEY,
} = process.env;

// Import Migrations
import m00 from "./tasks/migrations/00";
import m01 from "./tasks/migrations/01";

// Add global flags to migrations
const migrations = [m00, m01];
migrations.forEach((migration) => {
  migration.addFlag("write", "Write outputs to filesystem?");
});

const accounts = PRIVATE_KEY ? [PRIVATE_KEY] : [];

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: { url: ALCHEMY_RINKEBY_URI || "", chainId: 4, accounts },
    arbitrum_testnet: {
      url: ALCHEMY_ARBITRUM_TESTNET_URI || "https://rinkeby.arbitrum.io/rpc",
      //url: "https://rinkeby.arbitrum.io/rpc",
      chainId: 421611,
      accounts,
    },
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
    enabled: REPORT_GAS === "true",
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  abiExporter: {
    path: "../web/src/data",
    runOnCompile: false,
    clear: true,
    flat: false,
    pretty: false,
  },
};
