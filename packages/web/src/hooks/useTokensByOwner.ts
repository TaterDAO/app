// Hooks
import useActiveChains from "./useActiveChains";
import { useContractReads } from "wagmi";
import { useState, useEffect } from "react";
// Constants
import { CONTRACT_ADDRESSES } from "@constants/contract";
import {
  BALANCE_OF_ABI,
  TOKEN_OF_OWNER_BY_INDEX_ABI,
  METADATA_ID_BY_TOKEN_ID_ABI
} from "@constants/contract";
// Types
import { BigNumber } from "ethers";

enum Status {
  Idle = "IDLE",
  Loading = "LOADING",
  Success = "SUCCESS",
  Error = "ERROR"
}

/**
 * Fetches tokens owned by a given address and returns a set of their metadata
 * @param ownerAddress
 * @returns
 */
function useTokensByOwner(ownerAddress?: string): {
  tokenIds: Set<string>;
  status: Status;
  isSuccessful: boolean;
  isLoading: boolean;
  isIdle: boolean;
  isErrored: boolean;
} {
  const hasOwnerAddress = !!ownerAddress;

  const [balances, setBalances] = useState<Array<number>>([]);
  const [tokenIds, setTokenIds] = useState<Set<string>>(new Set([]));

  const [status, setStatus] = useState<Status>(Status.Idle);

  const activeChains = useActiveChains();

  useEffect(() => {
    if (hasOwnerAddress) setStatus(Status.Loading);
  }, [hasOwnerAddress]);

  useContractReads({
    contracts: activeChains.map((chain) => ({
      address: `0x${CONTRACT_ADDRESSES[chain.id]}`,
      abi: [BALANCE_OF_ABI],
      functionName: BALANCE_OF_ABI.name,
      args: [ownerAddress],
      chainId: chain.id
    })),
    enabled: hasOwnerAddress,
    onSuccess(data: Array<BigNumber>) {
      const asNumbers = data.map((n) => n.toNumber());
      setBalances(asNumbers);
    },
    onError() {
      setStatus(Status.Error);
    }
  });

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
    enabled: balances.length > 0,
    onError() {
      setStatus(Status.Error);
    }
  });

  useContractReads({
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
      tokenQuery.isSuccess && tokenQuery.data && tokenQuery.data.length > 0,
    onSuccess(data: Array<string>) {
      setTokenIds(new Set(data));
      setStatus(Status.Success);
    },
    onError() {
      setStatus(Status.Error);
    }
  });

  return {
    tokenIds,
    status,
    isSuccessful: status === Status.Success,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isErrored: status === Status.Error
  };
}

export default useTokensByOwner;
