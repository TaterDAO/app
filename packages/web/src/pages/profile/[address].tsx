// Types
import type { NextPage, GetServerSideProps } from "next";

// Components
import ProfileLayout from "@components/layouts/Profile";

// Utils
import { shortenAddress } from "@utils/Web3";

const ProfilePage: NextPage<{ address: string }> = ({ address }) => {
  return (
    <ProfileLayout
      address={address}
      title={`${shortenAddress(address)}'s Titles`}
    />
  );
};

const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { address: (query.address as string).toLowerCase() } };
};

export default ProfilePage;
export { getServerSideProps };
