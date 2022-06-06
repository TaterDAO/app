import CircularButton from "@components/ui/CircularButton";
import { Twitter } from "iconoir-react";

const TwitterButton = () => {
  return (
    <CircularButton href="https://twitter.com/taterdao">
      <Twitter height={20} width={20} color="var(--global-color-font)" />
    </CircularButton>
  );
};

export default TwitterButton;
