import { Player, WinCondition } from "../../global/types";

export type GameProps = {
  players: Player[];
  boardSize: string;
  winConditions: WinCondition[];
};
