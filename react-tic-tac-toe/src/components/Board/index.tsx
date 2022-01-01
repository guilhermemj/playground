import Square from '../Square';
import { BoardProps } from './types';

export const Board = ({
  squares,
  shouldHighLight = () => false,
  onClick = () => {},
}: BoardProps) => (
  <div>
    {squares.map((cols, row) => (
      <div className="board-row" key={row}>
        {cols.map((value, col) => (
          <Square
            key={col}
            value={value}
            isHighLight={shouldHighLight(row, col)}
            onClick={() => onClick(row, col)}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Board;
