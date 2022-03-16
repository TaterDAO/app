// Hooks
import useWeb3 from "@hooks/useWeb3";

// Components
import Button from "./ui/Button";

const Wallets: React.FC<{}> = ({}) => {
  const web3 = useWeb3();
  return web3.loading ? (
    <p>Loading...</p>
  ) : web3.wallet.connected ? (
    <div>
      <p>You are connected as {web3.wallet.address}</p>
      <Button onClick={web3.wallet.disconnect}>Disconnect</Button>
    </div>
  ) : (
    <div>
      <Button onClick={web3.wallet.connect}>Connect Wallet</Button>
    </div>
  );
};

export default Wallets;
