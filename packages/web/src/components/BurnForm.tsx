// components
import Button from "@components/ui/Button";

// hooks
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork
} from "wagmi";
import { useEffect } from "react";

// libs
import styled from "styled-components";
import { toast } from "react-toastify";

// types
import type { Chain } from "wagmi";

// constants
import { BURN_ABI, CONTRACT_ADDRESSES } from "@constants/contract";

const Container = styled.div`
  margin: var(--global-space-y-margin) 0;
`;

const BurnForm: React.FC<{ tokenId: number; chain: Chain }> = ({
  tokenId,
  chain
}) => {
  const { chain: activeChain } = useNetwork();

  const { config } = usePrepareContractWrite({
    address: `0x${CONTRACT_ADDRESSES[chain.id]}`,
    abi: [BURN_ABI],
    functionName: BURN_ABI.name,
    args: [tokenId],
    chainId: chain.id
  });

  const { write, isLoading, isSuccess, data, status } = useContractWrite({
    ...config,
    onSuccess: () => {
      toast.success(
        `Your transaction to burn TATR ${tokenId} on ${chain.name} successfully submitted. You will be notified once the transaction has been confirmed.`
      );
    },
    onError(error, variables, context) {
      toast.error(error.message);
    }
  });

  // After the burn has been submitted, wait for the transaction to confirm.
  // Show a success message when it does.
  useWaitForTransaction({
    hash: data?.hash,
    chainId: chain.id,
    enabled: isSuccess,
    onSuccess: (data) => {
      toast.success(
        `${tokenId} has successfully been burned on ${chain.name}!`
      );
    }
  });

  useEffect(() => {
    if (isLoading) toast.info("Open your wallet to proceed.");
  }, [isLoading]);

  const wrongChain = activeChain.id !== chain.id;

  return (
    <Container>
      <Button
        disabled={isLoading || isSuccess || wrongChain}
        onClick={() => write?.()}
        primary
        loading={isLoading}
      >
        {wrongChain
          ? `Switch to ${chain.name} to burn`
          : `Burn ${chain.name} TATR`}
      </Button>
    </Container>
  );
};

export default BurnForm;
