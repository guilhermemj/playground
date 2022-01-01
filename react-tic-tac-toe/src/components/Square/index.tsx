import { SquareProps } from './types';

export const Square = ({
  value,
  isHighLight = false,
  onClick = () => {},
}: SquareProps) => (
  <button className={ 'square' + (isHighLight ? ' highlight' : '')} onClick={onClick}>
    {value}
  </button>
);

export default Square;
