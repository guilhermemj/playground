import { Player, WinCondition } from "../../types";

export type GameProps = {
  players: Player[];
  boardSize: string;
  winConditions: WinCondition[];
};
