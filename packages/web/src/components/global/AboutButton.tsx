import CircularButton from "@components/ui/CircularButton";
import { QuestionMark } from "iconoir-react";

const CreateButton = () => {
  return (
    <CircularButton href="/info/about">
      <QuestionMark height={20} width={20} color="var(--global-color-font)" />
    </CircularButton>
  );
};

export default CreateButton;
