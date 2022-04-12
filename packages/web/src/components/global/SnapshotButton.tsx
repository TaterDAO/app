import CircularButton from "@components/ui/CircularButton";
import { ThumbsUp } from "iconoir-react";

const SnapshotButton = () => {
  return (
    <CircularButton href="https://snapshot.org/#/taterdao.eth">
      <ThumbsUp height={20} width={20} color="var(--global-color-font)" />
    </CircularButton>
  );
};

export default SnapshotButton;
