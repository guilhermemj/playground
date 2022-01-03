import { GameBoardSquareProps } from './types';
import { Button } from './styles';

import classNames from 'classnames';

export const GameBoardSquare = ({
  value,
  highlight = false,
  onClick = () => {},
}: GameBoardSquareProps) => (
  <Button className={classNames({ highlight })} onClick={onClick}>
    {value}
  </Button>
);

export default GameBoardSquare;
