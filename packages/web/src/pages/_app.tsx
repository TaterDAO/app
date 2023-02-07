// Types
import type { AppProps } from "next/app";

// Components
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@components/layouts/Global";
import AuthProvider from "@contexts/authentication/Provider";
import WalletConnect from "@components/WalletConnect";

// Styles
import GlobalStyle from "@styles/global";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TaterDAO</title>
      </Head>
      <GlobalStyle />
      <WalletConnect>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </WalletConnect>
      <ToastContainer hideProgressBar position="top-right" theme="colored" />
    </>
  );
}

export default App;
