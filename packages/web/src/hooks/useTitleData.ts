import { useContractReads } from "wagmi";

import { chains } from "@services/WalletConnect";
import {
  CONTRACT_ADDRESSES,
  TOKEN_ID_BY_METADATA_ABI,
  OWNER_OF_ABI
} from "@constants/contract";
import { memo } from "react";

const activeChains = chains.filter((chain) => !!CONTRACT_ADDRESSES[chain.id]);

/**
 * Determines which chains a title is minted on and returns pertinent data.
 * - Token ID
 * - Owner Address
 * @param metadataId
 * @returns
 */
function useTitleData(metadataId: string): {
  isLoading: boolean;
  tokenIds: number[][];
  // Array of owner ids. Indexing matches Token IDs
  ownerIds: Array<string>;
} {
  const tokenIdQuery = useContractReads({
    contracts: activeChains.map((chain) => ({
      address: `0x${CONTRACT_ADDRESSES[chain.id]}`,
      abi: [TOKEN_ID_BY_METADATA_ABI],
      functionName: "tokenIdByMetadataId",
      args: [metadataId],
      chainId: chain.id
    }))
  });

  const tokenIds: number[][] = tokenIdQuery.isSuccess
    ? //@ts-ignore
      tokenIdQuery.data
        .map((result, index) => [
          activeChains[index].id as number,
          parseInt(result as string)
        ])
        .filter((result) => result[1] !== 0)
    : [];

  const ownerQuery = useContractReads({
    contracts: tokenIds.map(([chainId, tokenId]) => {
      return {
        address: `0x${CONTRACT_ADDRESSES[chainId]}`,
        abi: [OWNER_OF_ABI],
        functionName: "ownerOf",
        args: [tokenId],
        chainId
      };
    }),
    enabled: tokenIdQuery.isSuccess
  });

  return {
    isLoading: tokenIdQuery.isLoading,
    tokenIds,
    ownerIds: ownerQuery.isSuccess ? (ownerQuery.data as Array<string>) : []
  };
}

export default useTitleData;
