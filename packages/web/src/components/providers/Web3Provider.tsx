// Contexts
import Web3Context from "@contexts/Web3";

// Types
import type { State } from "@T/Web3";
import type { IProviderInfo } from "web3modal";

// Libs
import Web3 from "web3";
import Web3Modal, { getProviderInfo } from "web3modal";
//import Fortmatic from "fortmatic";
import Minter, { Events as MinterEvents } from "@libs/Minter";

// Hooks
import { useEffect, useState } from "react";

// Utils
import { csr } from "@utils/browser";

declare global {
  interface Window {
    td: {
      minter: Minter | null;
    };
  }
}

const Web3Provider: React.FC<{
  children: React.ReactChild;
}> = ({ children }) => {
  //$ State

  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();
  const [chainId, setChainId] = useState<number | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [walletConnected, setWalletConnected] = useState<boolean | null>(null);
  const [providerInfo, setProviderInfo] = useState<IProviderInfo | null>();
  const [provider, setProvider] = useState<any>();
  const [initialized, setInitialized] = useState<boolean>(false);

  const multiProvider =
    provider && providerInfo && ["MetaMask"].includes(providerInfo.name);

  //$ Effects

  /**
   * On client side render, instantiate Web3Modal.
   */
  const clientSideRendered = csr();
  useEffect(() => {
    if (clientSideRendered) {
      setWeb3Modal(
        new Web3Modal({
          cacheProvider: true
          //! Only going with MetaMask for now
          // providerOptions: {
          //   fortmatic: {
          //     package: Fortmatic,
          //     options: {
          //       key: process.env.NEXT_PUBLIC_FORTMATIC_KEY
          //     }
          //   }
          // }
        })
      );
    }
  }, [clientSideRendered]);

  /**
   * Scope minter to window.
   */
  useEffect(() => {
    if (clientSideRendered && initialized) {
      if (chainId && web3) {
        window.td.minter = new Minter(web3 as Web3, chainId);
      } else {
        window.td.minter = null;
      }
    }
  }, [clientSideRendered, initialized, web3, chainId]);

  /**
   * Once W3M is instantiated, check if it has a cached provider.
   * If so, set up the wallet.
   * This is called via a new effect to ensure that #setup has access to
   * `web3Modal`.
   */
  useEffect(() => {
    if (web3Modal) {
      if (web3Modal.cachedProvider) setup();
      else setInitialized(true);
    }
  }, [web3Modal]);

  /**
   * Handle chain change.
   */

  useEffect(() => {
    return multiProvider
      ? provider.on("chainChanged", (_chainId: string) => {
          setChainId(web3?.utils.hexToNumber(_chainId) as number);
        })
      : null;
  }, [web3, multiProvider, provider, chainId]);

  /**
   * Handle account change.
   */
  useEffect(() => {
    return multiProvider
      ? provider.on("accountsChanged", (accounts: Array<string>) => {
          // User has disconnected all of their wallets
          if (accounts.length === 0) {
            setWalletConnected(false);
          } else {
            setAddress(accounts[0]);
          }
        })
      : null;
  }, [multiProvider, provider]);

  //$ Handlers

  async function setup() {
    const modal = web3Modal as Web3Modal;
    try {
      const provider = await modal.connect();
      setProvider(provider);

      const api = new Web3(provider);
      setWeb3(api);

      setProviderInfo(getProviderInfo(provider));
      setAddress((await api.eth.getAccounts())[0]);
      setChainId(await api.eth.getChainId());
      setWalletConnected(true);
    } catch (error) {
      // TODO: Display error message via a Toast.
      const errorMessage = (error as Error).message as string;
    } finally {
      setInitialized(true);
    }
  }

  const connectWallet = async (): Promise<void> => {
    if (walletConnected) return;
    try {
      await setup();
    } catch (err) {}
  };

  const disconnect = (): void => {
    if (!walletConnected) return;
    const modal = web3Modal as Web3Modal;
    modal.clearCachedProvider();

    setProvider(null);
    setProviderInfo(null);
    setWeb3(null);
    setAddress(null);
    setWalletConnected(false);
    setChainId(null);
  };

  //$ Render

  const state = {
    provider: web3?.eth.currentProvider,
    web3API: web3,
    wallet: {
      address: address?.toLowerCase(),
      provider: !!provider ? providerInfo : null,
      connected: walletConnected,
      connect: connectWallet,
      disconnect
    },
    network: {
      chainId,
      name:
        chainId === 1
          ? "mainnet"
          : chainId === 4
          ? "rinkeby"
          : chainId === 31337
          ? "localhost"
          : "unknown"
    },
    loading: !initialized,
    initialized
  } as State;

  return <Web3Context.Provider value={state}>{children}</Web3Context.Provider>;
};

export default Web3Provider;
