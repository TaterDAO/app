import { Web3Modal } from "@web3modal/react";
import { WagmiConfig } from "wagmi";
import { chains } from "@services/WalletConnect";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider
} from "@web3modal/ethereum";
import { configureChains, createClient } from "wagmi";

const WalletConnect: React.FC<{ children: React.ReactElement }> = ({
  children
}) => {
  const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId })
  ]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({
      projectId,
      version: "2",
      appName: "web3Modal",
      chains
    }),
    provider
  });

  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <>
      <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default WalletConnect;
