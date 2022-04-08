// Components
import Wallets from "@components/Wallets";
import MintButton from "@components/ui/MintButton";
import Link from "next/link";

// Libs
import styled from "styled-components";

// Hooks
import useWeb3 from "@hooks/useWeb3";

const Wordmark = styled.h1`
  color: var(--global-color-brand);
  font-family: var(--global-font-brand);
  font-style: italic;
  font-size: 3rem;
  cursor: pointer;
`;
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
        <Link href="/">
          <Wordmark>🥔 dao</Wordmark>
        </Link>
      </LeftColumn>
      <RightColumn>
        <Wallets />
        {web3.wallet.connected && (
          <>
            <MintButton>
              <Link href="/mint">Mint Title</Link>
            </MintButton>
            <Link href="/profile" passHref>
              <a>Profile</a>
            </Link>
          </>
        )}
      </RightColumn>
    </Container>
  );
};

export default Menu;
