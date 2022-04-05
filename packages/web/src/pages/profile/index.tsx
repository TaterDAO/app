// Types
import type { NextPage } from "next";

// Hooks
import useWeb3 from "@hooks/useWeb3";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Components
import ProfileLayout from "src/layouts/Profile";

// Libs
import styled from "styled-components";

const MintingCaption = styled.div`
  color: #bbb;
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
  }, [web3.initialized, web3.wallet.connected]);

  return web3.initialized && web3.wallet.connected ? (
    <ProfileLayout
      title="My Titles"
      address={web3.wallet.address as string}
      header={
        <MintingCaption>
          Titles still minting will appear momentarily
        </MintingCaption>
      }
    />
  ) : (
    <></>
  );
};

export default MyProfilePage;
