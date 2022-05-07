// Hooks
import useWeb3 from "@hooks/useWeb3";

// Components
import Button from "./ui/Button";
import ProfileButton from "./global/ProfileButton";

// Libs
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--global-space-nav-margin);
`;

const ChainName = styled.small`
  font-weight: 600;
  color: var(--color-bright-green);
  align-self: center;
  text-transform: capitalize;
`;

const Wallets: React.FC<{}> = ({}) => {
  const web3 = useWeb3();
  return (
    <Container>
      {web3.loading ? (
        <></>
      ) : web3.wallet.connected ? (
        <>
          {web3.network.chainId && <ChainName>{web3.network.name}</ChainName>}
          <ProfileButton />
        </>
      ) : (
        <Button onClick={web3.wallet.connect}>Connect Wallet</Button>
      )}
    </Container>
  );
};

export default Wallets;
