import { HistoryEntry } from "../../types";

export type MoveListItemProps = {
  move: HistoryEntry;
  isCurrent: boolean;
  onClick: (step: number) => void;
};

export type MoveListProps = {
  history: HistoryEntry[];
  currentStep: number;
  onClickItem: MoveListItemProps['onClick'];
};
