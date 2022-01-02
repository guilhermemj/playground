import GameBoardSquare from '../GameBoardSquare';
import { GameBoardProps } from './types';

export const GameBoard = ({
  squares,
  shouldHighLight = () => false,
  onClickSquare = () => {},
}: GameBoardProps) => (
  <div>
    {squares.map((cols, row) => (
      <div className="board-row" key={row}>
        {cols.map((value, col) => (
          <GameBoardSquare
            key={col}
            value={value}
            isHighLight={shouldHighLight(row, col)}
            onClick={() => onClickSquare(row, col)}
          />
        ))}
      </div>
    ))}
  </div>
);

export default GameBoard;
