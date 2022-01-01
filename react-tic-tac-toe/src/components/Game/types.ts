import { HistoryEntry } from "../../types";

export type GameProps = {};

export type GameState = {
  currentStep: number;
  history: HistoryEntry[];
  isHistoryDesc: boolean;
};
