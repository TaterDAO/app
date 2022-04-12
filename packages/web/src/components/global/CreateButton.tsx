import CircularButton from "@components/ui/CircularButton";
import { Plus } from "iconoir-react";

const CreateButton = () => {
  return (
    <CircularButton href="/mint">
      <Plus height={20} width={20} color="var(--global-color-font)" />
    </CircularButton>
  );
};

export default CreateButton;
