import CircularButton from "@components/ui/CircularButton";
import { Discord } from "iconoir-react";

const DiscordButton = () => {
  return (
    <CircularButton href="https://discord.gg/5bvC6JhBZa">
      <Discord height={20} width={20} color="var(--global-color-font)" />
    </CircularButton>
  );
};

export default DiscordButton;
