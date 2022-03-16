// Components
import Wallets from "@components/Wallets";

// Libs
import styled from "styled-components";

const Container = styled.nav`
  border-bottom: 1px solid var(--color-accent-gray);

  padding: 1rem 2rem;

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
  return (
    <Container>
      <LeftColumn>
        <h1>Name</h1>
      </LeftColumn>
      <RightColumn>
        <Wallets />
      </RightColumn>
    </Container>
  );
};

export default Menu;
