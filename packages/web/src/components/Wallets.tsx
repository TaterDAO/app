// Hooks
import useWeb3 from "@hooks/useWeb3";

// Components
import Button from "./ui/Button";

// Libs
import styled from "styled-components";

const Connected = styled.div`
  height: 1rem;
  width: 1rem;
  background: var(--color-bright-green);
  background: radial-gradient(
    circle,
    var(--color-bright-green) 30%,
    var(--global-color-bg) 100%
  );
  border-radius: 100%;
`;

const ChainName = styled.small`
  font-weight: 600;
  color: var(--color-bright-green);
`;

const DisconnectButton = styled(Button)`
  color: var(--color-red);
`;

const Wallets: React.FC<{}> = ({}) => {
  const web3 = useWeb3();
  return web3.loading ? (
    <p>Loading...</p>
  ) : web3.wallet.connected ? (
    <>
      {web3.network.chainId !== 1 && <ChainName>{web3.network.name}</ChainName>}
      <Connected />
      <DisconnectButton onClick={web3.wallet.disconnect}>
        Disconnect
      </DisconnectButton>
    </>
  ) : (
    <Button onClick={web3.wallet.connect}>Connect Wallet</Button>
  );
};

export default Wallets;
