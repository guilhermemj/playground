export type Player = string;

export type BoardSquare = null | Player;

export type MoveLocation = {
  row: number;
  col: number;
};

export type HistoryEntry = {
  stepNumber: number;
  squares: BoardSquare[][],
  location: MoveLocation | null;
};

export type GameResults = {
  isGameOver: boolean;
  isDraw: boolean;
  hasWinner: boolean;
  winnerPlayer: Player | null,
  winnerSquares: MoveLocation[],
};
