// Libs
import styled from "styled-components";

// Components
import Wordmark from "./Wordmark";
import Logo from "./Logo";
import ExploreButton from "./ExploreButton";
import CreateButton from "./CreateButton";
import Wallets from "@components/Wallets";

const Container = styled.div`
  min-height: 100vh;

  display: flex;
`;

const VerticalNav = styled.div`
  width: 60px;
  border-right: 1px solid var(--global-color-border);

  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  gap: var(--global-space-nav-margin);
`;

const Main = styled.div`
  width: 100%;
`;

const HeadNav = styled.div`
  height: 60px;
  width: 100%;
  border-bottom: 1px solid var(--global-color-border);

  padding: 0.5rem;
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 2.5rem 0;
`;

const MainContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const HeadNavContent = styled(MainContent)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <Container>
      <VerticalNav>
        <Logo />
        <ExploreButton />
        <CreateButton />
      </VerticalNav>
      <Main>
        <HeadNav>
          <HeadNavContent>
            <Wordmark />
            <Wallets />
          </HeadNavContent>
        </HeadNav>
        <ContentContainer>
          <MainContent>{children}</MainContent>
        </ContentContainer>
      </Main>
    </Container>
  );
};

export default Layout;
