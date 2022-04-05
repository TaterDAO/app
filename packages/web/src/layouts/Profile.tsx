// Components
import Search from "@components/search";

const ProfileLayout: React.FC<{
  title: string;
  address: string;
  header?: React.ReactElement;
}> = ({ title, address, header }) => {
  return (
    <div>
      <h1>{title}</h1>
      <br />
      {header && (
        <div>
          {header}
          <br />
        </div>
      )}
      <Search filters={`owner:${address}`} />
    </div>
  );
};

export default ProfileLayout;
