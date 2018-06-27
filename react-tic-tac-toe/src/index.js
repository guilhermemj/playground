import ReactDOM from 'react-dom';
import React from 'react';
import Game from './Game';

import './index.css';

ReactDOM.render(
	<Game />,
	document.getElementById('root'),
);

// TODO:
// [ ] Display the location for each move in the format (col, row) in the move history list.
// [ ] Bold the currently selected item in the move list.
// [x] Rewrite Board to use two loops to make the squares instead of hardcoding them.
// [ ] Add a toggle button that lets you sort the moves in either ascending or descending order.
// [ ] When someone wins, highlight the three squares that caused the win.
// [ ] When no one wins, display a message about the result being a draw.
