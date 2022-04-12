import CircularButton from "@components/ui/CircularButton";
import { Home } from "iconoir-react";

const ExploreButton = () => {
  return (
    <CircularButton href="/">
      <Home height={20} width={20} color="var(--global-color-font)" />
    </CircularButton>
  );
};

export default ExploreButton;
