// Types
import type { AppProps } from "next/app";

// Components
import Web3Provider from "@components/providers/Web3Provider";
import Menu from "@components/global/Menu";

// Styles
import GlobalStyle from "@styles/global";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Web3Provider>
        <>
          <Menu />
          <main>
            <Component {...pageProps} />
          </main>
        </>
      </Web3Provider>
    </>
  );
}

export default App;
