import React from 'react';
import Square from '../Square';

export const Board = ({ squares, shouldHighLight, onClick }) => (
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
