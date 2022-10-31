export default {
  42161: {
    chain: {
      id: 42161,
      internalId: "arbitrum_mainnet",
      name: "Arbitrum One"
    },
    contract: {
      address: "0x7a03b4132d38FAC364Cb13c51625B92aB7d15fAF"
    },
    rpc: {
      endpoint: process.env.ALCHEMY_ARB_ONE_URI as string
    },
    explorer: "https://arbiscan.io/"
  },
  421613: {
    chain: {
      id: 421613,
      internalId: "arbitrum_goerli",
      name: "Arbitrum Nitro Rollup Testnet"
    },
    contract: {
      address: ""
    },
    rpc: {
      endpoint: process.env.ALCHEMY_ARB_GOERLI_URI as string
    },
    explorer: "https://goerli-rollup-explorer.arbitrum.io/"
  },
  31337: {
    chain: {
      id: 31337,
      internalId: "localhost",
      name: "Localhost"
    },
    contract: {
      address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
    },
    rpc: {
      endpoint: "http://127.0.0.1:8545/"
    },
    explorer: null
  }
};
