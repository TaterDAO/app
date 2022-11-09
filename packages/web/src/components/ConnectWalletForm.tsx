// Utils
import styled from "styled-components";

// Hooks
import useWeb3 from "@hooks/useWeb3";

// Components
import TitledPage from "@components/layouts/TitledPage";
import Button from "./ui/Button";

const Container = styled.div`
  border: 1px solid var(--global-color-border);
  border-radius: var(--global-border-radius);
  padding: 2rem;
`;

const ConnectWalletForm = () => {
  const web3 = useWeb3();
  return (
    <TitledPage title="Connect Wallet">
      <Container>
        <Button onClick={web3.wallet.connect} primary>
          Connect Wallet
        </Button>
      </Container>
    </TitledPage>
  );
};

export default ConnectWalletForm;
