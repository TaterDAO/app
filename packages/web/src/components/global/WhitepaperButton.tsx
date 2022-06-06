import CircularButton from "@components/ui/CircularButton";
import { Page } from "iconoir-react";

const CreateButton = () => {
  return (
    <CircularButton href="https://mirror.xyz/james.lexdao.eth/wP5ywUeJU_IAGIcIey4aX0Lxn77P5BM5aH7D-stNmBQ">
      <Page height={20} width={20} color="var(--global-color-font)" />
    </CircularButton>
  );
};

export default CreateButton;
