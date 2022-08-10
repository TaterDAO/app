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
  TATERDAO_ADMIN_PRIVATE_KEY,
  ALCHEMY_RINKEBY_URI,
  ALCHEMY_ARBITRUM_TESTNET_URI,
  ALCHEMY_ARBITRUM_MAINNET_URI,
  REPORT_GAS,
  ETHERSCAN_API_KEY,
  COINMARKETCAP_API_KEY,
  ALCHEMY_GOERLI_URI,
} = process.env;

// Import Migrations
import m00 from "./tasks/migrations/00";
import m01 from "./tasks/migrations/01";
import m02 from "./tasks/migrations/02";

// Add global flags to migrations
const migrations = [m00, m01, m02];
migrations.forEach((migration) => {
  //! Deprecated
  // migration.addFlag("write", "Write outputs to filesystem?");
});

const accounts = TATERDAO_ADMIN_PRIVATE_KEY ? [TATERDAO_ADMIN_PRIVATE_KEY] : [];

const abiExporterConfig = {
  runOnCompile: false,
  clear: true,
  flat: false,
  pretty: false,
};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: { url: ALCHEMY_RINKEBY_URI || "", chainId: 4, accounts },
    goerli: {
      url: ALCHEMY_GOERLI_URI || "",
      chainId: 5,
      accounts,
    },
    arbitrum_testnet: {
      url: ALCHEMY_ARBITRUM_TESTNET_URI || "https://rinkeby.arbitrum.io/rpc",
      //url: "https://rinkeby.arbitrum.io/rpc",
      chainId: 421611,
      accounts,
    },
    arbitrum_mainnet: {
      url: ALCHEMY_ARBITRUM_MAINNET_URI || "https://arb1.arbitrum.io/rpc",
      chainId: 42161,
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
  abiExporter: [
    { path: "../web/src/data", ...abiExporterConfig },
    { path: "../defender/src/data/abi", ...abiExporterConfig },
  ],
};
