import React from 'react';
import Square from '../Square';

export const Board = (props) => (
  <div>
    {props.squares.map((cols, row) => (
      <div className="board-row" key={row}>
        {cols.map((value, col) => (
          <Square
            key={col}
            value={value}
            isHighLight={props.shouldHighLight(row, col)}
            onClick={() => props.onClick(row, col)}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Board;
