import type Web3 from "web3";
import type { IProviderInfo } from "web3modal";

type State = {
  provider: any | null;
  web3API: Web3 | null;
  wallet: {
    address: string | null;
    provider: IProviderInfo | null;
    connected: boolean | null;
    connect: () => Promise<void>;
    disconnect: () => void;
  };
  network: {
    chainId: number | null;
    name: string;
  };
  loading: boolean;
  initialized: boolean;
};

export type { State };
