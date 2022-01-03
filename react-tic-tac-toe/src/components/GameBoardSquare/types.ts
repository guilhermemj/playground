import { SquareState } from '../../global/types';

export type GameBoardSquareProps = {
  value: SquareState;
  highlight?: boolean;
  onClick?: () => void;
};
