import Button from "@components/ui/Button";
import styled from "styled-components";
import { useState } from "react";
import useWeb3 from "@hooks/useWeb3";

const Container = styled.div`
  margin: var(--global-space-y-margin) 0;
`;

const BurnForm: React.FC<{ tokenId: number }> = ({ tokenId }) => {
  const web3 = useWeb3();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleClick = async () => {
    try {
      setSubmitting(true);

      await window.td.minter?.burn(tokenId, web3.wallet.address as string);
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Button disabled={submitting} onClick={handleClick}>
        Burn
      </Button>
    </Container>
  );
};

export default BurnForm;
