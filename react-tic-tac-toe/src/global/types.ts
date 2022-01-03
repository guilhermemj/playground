export type Player = string;

export type SquareState = null | Player;
export type BoardState = SquareState[][];

export type SquareLocation = {
  row: number;
  col: number;
};

export type Move = {
  location: SquareLocation;
  stepNumber: number;
  boardState: BoardState,
};

export type WinCondition = SquareLocation[];

export type GameResults = {
  isGameOver: boolean;
  isDraw: boolean;
  hasWinner: boolean;
  winner: Player | null,
  winnerSquares: WinCondition,
};
