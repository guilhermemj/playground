import { Move } from "../../types";

export type MoveHistoryProps = {
  history: Move[];
  currentStep: number;
  onClickItem: (step: number) => void;
};
