import { CONTRACT_ADDRESSES, OWNER_OF_ABI } from "@constants/contract";

import { useContractReads } from "wagmi";

// Array of addresses. Indexing matches token id indexing.
type OwnerIds = Array<string>;

function useTokenOwners(
  tokens: Array<{ chainId: number; tokenId: number }> = []
) {
  const result = useContractReads({
    contracts: tokens.map(({ chainId, tokenId }) => ({
      address: `0x${CONTRACT_ADDRESSES[chainId]}`,
      abi: [OWNER_OF_ABI],
      functionName: OWNER_OF_ABI.name,
      args: [tokenId],
      chainId
    })),
    enabled: tokens.length > 0
  });

  return {
    ...result,
    data: result.isSuccess ? (result.data as OwnerIds) : []
  };
}

export default useTokenOwners;
