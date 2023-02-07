import { chains } from "@services/WalletConnect";
import { CONTRACT_ADDRESSES } from "@constants/contract";
import type { Chain } from "wagmi";

function useActiveChains(): Array<Chain> {
  return chains.filter((chain) => !!CONTRACT_ADDRESSES[chain.id]);
}

export default useActiveChains;
