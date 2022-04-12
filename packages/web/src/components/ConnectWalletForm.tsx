import styled from "styled-components";
import Button from "./ui/Button";
import useWeb3 from "@hooks/useWeb3";

const Container = styled.div`
  border: 1px solid var(--global-color-border);
  border-radius: var(--global-border-radius);
  padding: 2rem;
`;

const ConnectWalletForm = () => {
  const web3 = useWeb3();
  return (
    <Container>
      <Button onClick={web3.wallet.connect} primary>
        Connect Wallet
      </Button>
    </Container>
  );
};

export default ConnectWalletForm;
