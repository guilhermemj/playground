import { BoardSquare } from '../../types';

export type SquareProps = {
  value: BoardSquare;
  isHighLight?: boolean;
  onClick?: () => void;
};
