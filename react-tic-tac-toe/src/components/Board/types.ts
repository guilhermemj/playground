import { BoardSquare } from "../../types";

export type BoardProps = {
  squares: BoardSquare[][];
  shouldHighLight: (row: number, col: number) => boolean;
  onClick: (row: number, col: number) => void;
};
