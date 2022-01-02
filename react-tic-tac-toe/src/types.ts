export type Player = string;

export type SquareState = null | Player;
export type BoardState = SquareState[][];

export type SquareLocation = {
  row: number;
  col: number;
};

export type Move = {
  stepNumber: number;
  squares: BoardState,
  location: SquareLocation;
};

export type GameResults = {
  isGameOver: boolean;
  isDraw: boolean;
  hasWinner: boolean;
  winnerPlayer: Player | null,
  winnerSquares: SquareLocation[],
};
