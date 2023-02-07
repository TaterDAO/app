import useActiveChains from "./useActiveChains";
import { useContractReads } from "wagmi";
import { CONTRACT_ADDRESSES } from "@constants/contract";
import {
  BALANCE_OF_ABI,
  TOKEN_OF_OWNER_BY_INDEX_ABI,
  METADATA_ID_BY_TOKEN_ID_ABI
} from "@constants/contract";
import { BigNumber } from "ethers";

/**
 * Fetches tokens owned by a given address and returns a set of their metadata
 * @param ownerAddress
 * @returns
 */
function useTokensByOwner(ownerAddress?: string): Set<string> {
  const activeChains = useActiveChains();

  const balanceQuery = useContractReads({
    contracts: activeChains.map((chain) => ({
      address: `0x${CONTRACT_ADDRESSES[chain.id]}`,
      abi: [BALANCE_OF_ABI],
      functionName: BALANCE_OF_ABI.name,
      args: [ownerAddress],
      chainId: chain.id
    })),
    enabled: !!ownerAddress
  });

  const balances =
    (balanceQuery.data as Array<BigNumber>)?.map((balance) =>
      balance ? parseInt(balance.toString()) : 0
    ) || [];

  const tokenQueryContracts = balances.reduce((memo: any[], balance, index) => {
    const chain = activeChains[index];
    for (let tokenIndex = 0; tokenIndex < balance; tokenIndex++) {
      memo.push({
        address: `0x${CONTRACT_ADDRESSES[chain.id]}`,
        abi: [TOKEN_OF_OWNER_BY_INDEX_ABI],
        functionName: TOKEN_OF_OWNER_BY_INDEX_ABI.name,
        args: [ownerAddress, tokenIndex],
        chainId: chain.id
      });
    }
    return memo;
  }, []);

  const tokenQuery = useContractReads({
    contracts: tokenQueryContracts,
    enabled: balances.length > 0
  });

  const metadataQuery = useContractReads({
    contracts:
      (tokenQuery.data as Array<BigNumber>)?.map((tokenId, index) => {
        const tokenQueryContract = tokenQueryContracts[index];
        return {
          address: tokenQueryContract.address,
          abi: [METADATA_ID_BY_TOKEN_ID_ABI],
          functionName: METADATA_ID_BY_TOKEN_ID_ABI.name,
          args: [tokenId],
          chainId: tokenQueryContract.chainId
        };
      }) || [],
    enabled:
      tokenQuery.isSuccess && tokenQuery.data && tokenQuery.data.length > 0
  });

  return new Set((metadataQuery.data as Array<string>) || []);
}

export default useTokensByOwner;
