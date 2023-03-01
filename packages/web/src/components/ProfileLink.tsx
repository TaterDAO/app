// Components
import Link from "@components/ui/Link";

// Utils
import { shortenAddress } from "@utils/Web3";

// Hooks
import { useAccount } from "wagmi";

const ProfileLink: React.FC<{ address?: string }> = ({ address }) => {
  const { address: accountAddress } = useAccount();
  const isUser = accountAddress === address;

  return (
    !!address && (
      <Link href={isUser ? "/profile" : `/profile/${address}`}>
        {isUser ? "You" : shortenAddress(address)}
      </Link>
    )
  );
};

export default ProfileLink;
