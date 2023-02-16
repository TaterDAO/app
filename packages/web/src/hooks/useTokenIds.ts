import { useContractReads } from "wagmi";

import useActiveChains from "./useActiveChains";
import {
  CONTRACT_ADDRESSES,
  TOKEN_ID_BY_METADATA_ABI
} from "@constants/contract";

import { BigNumber } from "ethers";

/**
 * Determines which chains a title is minted on and returns pertinent data.
 * - Token ID
 * - Owner Address
 * @param metadataId
 * @returns
 */
function useTokenIds(metadataId: string) {
  const activeChains = useActiveChains();

  const result = useContractReads({
    contracts: activeChains.map((chain) => ({
      address: `0x${CONTRACT_ADDRESSES[chain.id]}`,
      abi: [TOKEN_ID_BY_METADATA_ABI],
      functionName: "tokenIdByMetadataId",
      args: [metadataId],
      chainId: chain.id
    }))
  });

  return {
    ...result,
    data: result.isSuccess
      ? (result.data as Array<BigNumber>)?.map((tokenId, index) => {
          const asNumber = tokenId.toNumber();
          return {
            chainId: activeChains[index].id,
            tokenId: asNumber,
            minted: asNumber !== 0
          };
        })
      : []
  };
}

export default useTokenIds;
