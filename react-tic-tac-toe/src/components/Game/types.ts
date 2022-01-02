import { Move } from "../../types";

export type GameProps = {};

export type GameState = {
  currentStep: number;
  history: Move[];
  isHistoryDesc: boolean;
};
