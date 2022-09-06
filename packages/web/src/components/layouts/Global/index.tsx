// Libs
import styled from "styled-components";

// Components
import Wordmark from "@components/global/Wordmark";
import Logo from "@components/global/Logo";
import ExploreButton from "@components/global/ExploreButton";
import CreateButton from "@components/global/CreateButton";
import Wallets from "@components/Wallets";
import SnapshotButton from "@components/global//SnapshotButton";
import DiscordButton from "@components/global/DiscordButton";
import AboutButton from "@components/global/AboutButton";
import TwitterButton from "@components/global/TwitterButton";
import WhitepaperButton from "@components/global/WhitepaperButton";
import Divider from "@components/ui/Divider";
import TOSButton from "@components/global/TOSButton";

// Utils
import { transactionsDisabled } from "@utils/flags";

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

const AlertBanner = styled.div`
  width: 100%;

  text-align: center;
  padding: 0.5rem;

  background-color: var(--global-color-attention);
`;

function showAlertBanner(): boolean {
  if (transactionsDisabled()) return true;
  else return false;
}

function alertBannerMessage(): string {
  if (transactionsDisabled()) {
    return "Minting and Burning are currently disabled for scheduled maintenance.";
  } else {
    return "";
  }
}

function canCreate(): boolean {
  if (transactionsDisabled()) return false;
  else return true;
}

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <Container>
      <VerticalNav>
        <Logo />
        <ExploreButton />
        {canCreate() && <CreateButton />}
        <AboutButton />
        <WhitepaperButton />
        <Divider />
        <SnapshotButton />
        <DiscordButton />
        <TwitterButton />
        <Divider />
        <TOSButton />
      </VerticalNav>
      <Main>
        <HeadNav>
          <HeadNavContent>
            <Wordmark />
            <Wallets />
          </HeadNavContent>
        </HeadNav>
        {showAlertBanner() && <AlertBanner>{alertBannerMessage()}</AlertBanner>}
        <ContentContainer>
          <MainContent>{children}</MainContent>
        </ContentContainer>
      </Main>
    </Container>
  );
};

export default Layout;
