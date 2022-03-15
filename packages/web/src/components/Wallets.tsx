// Hooks
import useWeb3 from "@hooks/useWeb3";

const Wallets: React.FC<{}> = ({}) => {
  const web3 = useWeb3();
  return web3.loading ? (
    <p>Loading...</p>
  ) : web3.wallet.connected ? (
    <div>
      <p>You are connected as {web3.wallet.address}</p>
      <button onClick={web3.wallet.disconnect}>Disconnect</button>
    </div>
  ) : (
    <div>
      <button onClick={web3.wallet.connect}>Connect Wallet</button>
    </div>
  );
};

export default Wallets;
