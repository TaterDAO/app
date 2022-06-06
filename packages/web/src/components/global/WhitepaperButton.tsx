import CircularButton from "@components/ui/CircularButton";
import { Page } from "iconoir-react";

const CreateButton = () => {
  return (
    <CircularButton href="#">
      <Page height={20} width={20} color="var(--global-color-font)" />
    </CircularButton>
  );
};

export default CreateButton;
