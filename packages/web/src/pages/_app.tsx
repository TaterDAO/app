// Types
import type { AppProps } from "next/app";

// Components
import Head from "next/head";
import Web3Provider from "@components/providers/Web3Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@components/layouts/Global";

// Styles
import GlobalStyle from "@styles/global";

function App({ Component, pageProps }: AppProps) {
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
