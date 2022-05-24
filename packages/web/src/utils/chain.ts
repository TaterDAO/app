import networks from "@data/networks";

type ChainConfig = {
  chain: {
    id: number;
    internalId: string;
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

function getChainConfigByInternalId(internalId: string): ChainConfig | null {
  const config = Object.entries(networks).find(
    ([id, config]) => config.chain.internalId === internalId
  );
  return !!config ? config[1] : null;
}

export { getChainConfig, getChainConfigByInternalId };
