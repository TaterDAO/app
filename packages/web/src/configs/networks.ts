type ChainConfig = {
  network: {
    name: string;
  };
  contract: {
    address: string;
  };
  graph: {
    endpoint: string;
  };
};

type Config = {
  [chainId: number]: ChainConfig;
};

const config = {
  421611: {
    network: {
      name: "Arbitrum Testnet"
    },
    contract: {
      address: "0x9c073D6085FBeac8eB72114f2c2b30398229a314"
    },
    graph: {
      endpoint: ""
    }
  },
  421612: {
    network: {
      name: "Localhost"
    },
    contract: {
      address: "0xCfEB869F69431e42cdB54A4F4f105C19C080A601"
    },
    graph: {
      endpoint: "http://localhost:8000/subgraphs/name/titles"
    }
  }
} as Config;

export default config;
