import { GameBoardSquareProps } from './types';

export const GameBoardSquare = ({
  value,
  isHighLight = false,
  onClick = () => {},
}: GameBoardSquareProps) => (
  <button className={ 'square' + (isHighLight ? ' highlight' : '')} onClick={onClick}>
    {value}
  </button>
);

export default GameBoardSquare;
