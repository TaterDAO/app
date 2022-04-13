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

// Hooks
import { useEffect } from "react";

// Utils
import { csr } from "@utils/browser";

declare global {
  interface Window {
    td: {
      minter: Minter | null;
    };
  }
}

function App({ Component, pageProps }: AppProps) {
  /**
   * Set up window-scoped properties.
   */
  const clientSideRendered = csr();
  useEffect(() => {
    if (clientSideRendered) {
      window.td = {
        minter: null
      };
    }
  }, [clientSideRendered]);

  return (
    <>
      <Head>
        <title>TaterDAO</title>
      </Head>
      <GlobalStyle />
      <Web3Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3Provider>
      <ToastContainer hideProgressBar position="top-right" theme="colored" />
    </>
  );
}

export default App;
