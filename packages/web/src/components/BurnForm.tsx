// components
import Button from "@components/ui/Button";

// hooks
import { useState } from "react";
import useWeb3 from "@hooks/useWeb3";
import { useRouter } from "next/router";

// libs
import styled from "styled-components";
import { toast } from "react-toastify";

// Utils
import { transactionsDisabled } from "@utils/flags";

const Container = styled.div`
  margin: var(--global-space-y-margin) 0;
`;

const BurnForm: React.FC<{ tokenId: number; titleName: string }> = ({
  tokenId,
  titleName
}) => {
  const web3 = useWeb3();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [burning, setBurning] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      setSubmitting(true);
      setBurning(true);

      await window.td.minter?.burn(tokenId, web3.wallet.address as string);

      router.push("/");
      toast.success(
        `${titleName} has been burned. It will be removed from TaterDAO momentarily.`
      );
    } catch (error) {
      setBurning(false);
      //@ts-ignore
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Button
        disabled={submitting || transactionsDisabled()}
        onClick={handleClick}
        primary
        loading={burning}
      >
        Burn
      </Button>
    </Container>
  );
};

export default BurnForm;
