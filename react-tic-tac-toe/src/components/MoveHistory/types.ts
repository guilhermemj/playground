import { Move } from "../../global/types";

export type MoveHistoryProps = {
  history: Move[];
  shouldHighlightItem?: (step: number) => boolean;
  onClickItem?: (step: number) => void;
};
