// Components
import Wallets from "@components/Wallets";
import Button from "@components/ui/Button";
import Link from "next/link";

// Libs
import styled from "styled-components";

// Hooks
import useWeb3 from "@hooks/useWeb3";

const Container = styled.nav`
  display: flex;
`;

const Column = styled.div`
  align-self: center;
  align-items: center;
  gap: 1rem;
  display: flex;
`;

const LeftColumn = styled(Column)`
  margin-right: auto;
`;

const RightColumn = styled(Column)`
  margin-left: auto;
`;

const Menu: React.FC<{}> = ({}) => {
  const web3 = useWeb3();
  return (
    <Container>
      <LeftColumn>
        <h1>
          <Link href="/">TaterDAO</Link>
        </h1>
      </LeftColumn>
      <RightColumn>
        <Wallets />
        {web3.wallet.connected && (
          <>
            <Button primary>
              <Link href="/mint">Mint Title</Link>
            </Button>
            <Link href="/profile">
              <a>Profile</a>
            </Link>
            <Link href="/explore">
              <a>Explore</a>
            </Link>
          </>
        )}
      </RightColumn>
    </Container>
  );
};

export default Menu;
