import { SquareState } from '../../types';

export type GameBoardSquareProps = {
  value: SquareState;
  isHighLight?: boolean;
  onClick?: () => void;
};
