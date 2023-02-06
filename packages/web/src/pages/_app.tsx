// Types
import type { AppProps } from "next/app";
import Minter from "@libs/Minter";

// Components
import Head from "next/head";
import Web3Provider from "@components/providers/Web3Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@components/layouts/Global";

// Styles
import GlobalStyle from "@styles/global";

// Wallet Connect
import { Web3Modal } from "@web3modal/react";
import { WagmiConfig } from "wagmi";
import {
  WALLETCONNECT_PROJECT_ID,
  ethereumClient,
  wagmiClient
} from "@services/WalletConnect";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TaterDAO</title>
      </Head>
      <GlobalStyle />
      <WagmiConfig client={wagmiClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WagmiConfig>
      <Web3Modal
        projectId={WALLETCONNECT_PROJECT_ID}
        ethereumClient={ethereumClient}
      />
      <ToastContainer hideProgressBar position="top-right" theme="colored" />
    </>
  );
}

export default App;
