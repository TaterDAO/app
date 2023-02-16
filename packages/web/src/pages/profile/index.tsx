// Types
import type { NextPage } from "next";

// Hooks
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";

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
  const router = useRouter();
  const { address, isDisconnected } = useAccount();

  /**
   * Ensure that the user is logged in.
   */
  useEffect(() => {
    if (isDisconnected) router.push("/");
  }, [router, isDisconnected]);

  return isDisconnected ? (
    <></>
  ) : (
    <ProfileLayout title="My Titles" address={address as string} />
  );
};

export default MyProfilePage;
