// Components
import { Row, ErrorMessage } from "@components/ui/Form";
import Button from "@components/ui/Button";
import NextLink from "next/link";

// Hooks
import useMintForm from "./useMintForm";
import { useState } from "react";
import {
  useAccount,
  useSwitchNetwork,
  useNetwork,
  useContractWrite,
  usePrepareContractWrite
} from "wagmi";

// Types
import type { Chain } from "wagmi";

// Services
import { chains } from "@services/WalletConnect";
import { METADATA_COLLECTION_ID, db } from "@services/Firebase";
import { doc, setDoc } from "firebase/firestore";

// Constants
import { CONTRACT_ADDRESSES, MINT_ABI } from "@constants/contract";
import { toast } from "react-toastify";

// Libs
import styled from "styled-components";

const SuccessMessage = styled.strong`
  margin-top: var(--global-space-y-margin);
  text-align: center;
  color: var(--color-green);
`;

const SubmitButton: React.FC<{}> = ({}) => {
  // Has a chain already been minted on? Used to prevent duplicate mints.
  const [mintedOn, setMintedOn] = useState<Set<number>>(new Set([]));

  // Has metadata already been saved? Used to prevent duplicate API writes.
  const [metadataSaved, setMetadataSaved] = useState<boolean>(false);

  const form = useMintForm();

  const firestoreDoc = doc(
    db,
    METADATA_COLLECTION_ID,
    form.state.metadataSignature as string
  );

  const { isDisconnected, address } = useAccount();

  const { chain: activeChain } = useNetwork();
  //@ts-ignore
  const activeChainId = activeChain.id;

  const {
    switchNetwork,
    isLoading: networkSwitchIsLoading,
    error: switchNetworkError
  } = useSwitchNetwork({
    // Submit transaction
    onSuccess(data) {
      write?.();
    }
  });

  const { config } = usePrepareContractWrite({
    address: `0x${CONTRACT_ADDRESSES[activeChainId]}`,
    abi: [MINT_ABI],
    functionName: "mint",
    args: [form.state.metadataSignature]
  });

  const {
    isLoading: mintIsLoading,
    error: mintError,
    write
  } = useContractWrite({
    ...config,
    onSuccess: async () => {
      if (!metadataSaved) {
        await setDoc(firestoreDoc, {
          createdBy: address,
          metadata: form.metadata
        });
        setMetadataSaved(true);

        setMintedOn((chains) => {
          chains.add(activeChainId);
          return chains;
        });
      }
    }
  });

  //
  //
  // EVENT HANDLERS
  //
  //

  const handleClick = (chain: Chain) => {
    if (activeChainId === chain.id) write?.();
    else {
      toast.info(`Switching to ${chain.name}. Please check your wallet.`);
      //@ts-ignore
      switchNetwork(chain.id);
    }
  };

  //
  //
  // RENDER
  //
  //

  const isLoading = networkSwitchIsLoading || mintIsLoading;

  return (
    <Row>
      {isDisconnected && (
        <ErrorMessage>Please connect your wallet to Mint</ErrorMessage>
      )}
      {switchNetworkError && (
        <ErrorMessage>Error switching network. Please try again!</ErrorMessage>
      )}
      {mintError && (
        <ErrorMessage>Error minting. Please try again!</ErrorMessage>
      )}
      {chains.map((chain) => (
        <Button
          primary
          key={`mint-btn-${chain.id}`}
          onClick={() => handleClick(chain)}
          disabled={
            isLoading || !CONTRACT_ADDRESSES[chain.id] || mintedOn.has(chain.id)
          }
        >{`Mint to ${chain.name}`}</Button>
      ))}
      {metadataSaved && (
        <SuccessMessage>
          Your title has been successfully minted. You can view it{" "}
          <NextLink href={`/tatr/${form.state.metadataSignature}`}>
            here
          </NextLink>
          .
        </SuccessMessage>
      )}
    </Row>
  );
};

export default SubmitButton;
