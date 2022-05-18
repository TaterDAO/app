import networks from "@data/networks";

type ChainConfig = {
  chain: {
    id: string;
    name: string;
  };
  contract: {
    address: string;
  };
  rpc: {
    endpoint: string;
  };
  explorer: string | null;
};

type Configs = {
  [chainId: number]: ChainConfig;
};

function getChainConfig(chainId: number): ChainConfig | null {
  const chainInfo = (networks as Configs)[chainId as number];
  return !!chainInfo ? chainInfo : null;
}

export { getChainConfig };
