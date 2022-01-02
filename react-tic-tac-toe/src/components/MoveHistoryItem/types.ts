import { Move } from "../../types";

export type MoveHistoryItemProps = {
  move: Move;
  isCurrent: boolean;
  onClick: () => void;
};
