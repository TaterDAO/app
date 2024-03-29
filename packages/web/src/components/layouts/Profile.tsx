// Components
import TitledPage from "./TitledPage";
import Search from "@components/search";

const ProfileLayout: React.FC<{
  title: string;
  address: string;
  header?: React.ReactElement;
}> = ({ title, address, header }) => {
  return (
    <TitledPage title={title}>
      <Search ownerAddress={address} />
    </TitledPage>
  );
};

export default ProfileLayout;
