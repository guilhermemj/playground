import GameBoardSquare from '../GameBoardSquare';
import { GameBoardProps } from './types';
import { BoardRow, BoardWrapper } from './styles';

export const GameBoard = ({
  squares,
  shouldHighLight = () => false,
  onClickSquare = () => {},
}: GameBoardProps) => (
  <BoardWrapper>
    {squares.map((cols, row) => (
      <BoardRow key={row}>
        {cols.map((value, col) => (
          <GameBoardSquare
            key={col}
            value={value}
            highlight={shouldHighLight(row, col)}
            onClick={() => onClickSquare(row, col)}
          />
        ))}
      </BoardRow>
    ))}
  </BoardWrapper>
);

export default GameBoard;
