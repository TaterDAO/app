// Types
import type { NextPage } from "next";

// Hooks
import useWeb3 from "@hooks/useWeb3";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Components
import ProfileLayout from "@components/layouts/Profile";
import Button from "@components/ui/Button";

// Libs
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  margin-bottom: var(--global-space-y-margin);
`;

const MintingCaption = styled.strong`
  color: var(--global-color-font-secondary);
  font-weight: 600;
  font-style: italic;
  align-self: center;
`;

const MyProfilePage: NextPage = ({}) => {
  const web3 = useWeb3();
  const router = useRouter();

  /**
   * Ensure that the user is logged in.
   */
  useEffect(() => {
    if (web3.initialized && !web3.wallet.connected) {
      router.push("/");
    }
  }, [web3.initialized, web3.wallet.connected, router]);

  return web3.initialized && web3.wallet.connected ? (
    <ProfileLayout
      title="My Titles"
      address={web3.wallet.address as string}
      header={
        <Header>
          <MintingCaption>
            Titles still minting will appear momentarily
          </MintingCaption>
          <Button onClick={web3.wallet.disconnect}>Disconnect</Button>
        </Header>
      }
    />
  ) : (
    <></>
  );
};

export default MyProfilePage;
