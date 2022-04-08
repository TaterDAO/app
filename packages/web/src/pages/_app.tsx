// Types
import type { AppProps } from "next/app";

// Components
import Head from "next/head";
import Web3Provider from "@components/providers/Web3Provider";
import Menu from "@components/global/Menu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <>
          <Menu />
          <main>
            <Component {...pageProps} />
          </main>
        </>
      </Web3Provider>
      <ToastContainer hideProgressBar position="top-right" theme="colored" />
    </>
  );
}

export default App;
