// Types
import type { AppProps } from "next/app";

// Components
import Web3Provider from "@components/providers/Web3Provider";

function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>
  );
}

export default App;
