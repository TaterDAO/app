import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider
} from "@web3modal/ethereum";

import { configureChains, createClient } from "wagmi";

import {
  arbitrum,
  mainnet,
  polygon,
  goerli,
  arbitrumGoerli,
  polygonMumbai
} from "wagmi/chains";

export const WALLETCONNECT_PROJECT_ID = process.env
  .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

export const chains = [
  arbitrum,
  arbitrumGoerli,
  mainnet,
  goerli,
  polygon,
  polygonMumbai
];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: WALLETCONNECT_PROJECT_ID })
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: WALLETCONNECT_PROJECT_ID,
    version: "2",
    appName: "web3Modal",
    chains
  }),
  provider
});

// Web3Modal Ethereum Client
export const ethereumClient = new EthereumClient(wagmiClient, chains);
