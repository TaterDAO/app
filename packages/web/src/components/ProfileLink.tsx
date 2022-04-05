// Components
import Link from "@components/ui/Link";

// Utils
import { shortenAddress } from "@utils/Web3";

// Hooks
import useWeb3 from "@hooks/useWeb3";

const ProfileLink: React.FC<{ address: string }> = ({ address }) => {
  const web3 = useWeb3();

  const connected = web3.initialized && web3.wallet.connected;
  const isUser = connected && address === web3.wallet.address;

  return (
    <Link href={isUser ? "/profile" : `/profile/${address}`}>
      {isUser ? "You" : shortenAddress(address)}
    </Link>
  );
};

export default ProfileLink;
