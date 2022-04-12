import CircularButton from "@components/ui/CircularButton";
import { ProfileCircled } from "iconoir-react";

const ProfileButton = () => {
  return (
    <CircularButton href="/profile">
      <ProfileCircled height={20} width={20} color="var(--global-color-font)" />
    </CircularButton>
  );
};

export default ProfileButton;
