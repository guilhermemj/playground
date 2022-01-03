import { Move } from "../../global/types";

export type MoveHistoryListProps = {
  items: Move[];
  shouldHighlightItem?: (step: number) => boolean;
  onClickItem?: (step: number) => void;
};
