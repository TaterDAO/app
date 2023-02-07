import {
  arbitrum,
  mainnet,
  polygon,
  goerli,
  arbitrumGoerli,
  polygonMumbai
} from "wagmi/chains";

import type { Chain } from "wagmi/chains";

const prodChains = [mainnet, arbitrum, polygon];
const testChains = [arbitrumGoerli, goerli, polygonMumbai];

export const chains =
  process.env.VERCEL_ENV === "production"
    ? prodChains
    : [...prodChains, ...testChains];

export const chainsById: Record<number, Chain> = chains.reduce(
  (memo, chain) => ({ ...memo, [chain.id]: chain }),
  {}
);
