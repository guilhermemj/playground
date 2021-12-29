import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Game from './components/Game';

/*
   TODO
  --------------------

  [X] Display the location for each move in the format (col, row) in the move history list.
  [X] Bold the currently selected item in the move list.
  [X] Rewrite Board to use two loops to make the squares instead of hardcoding them.
  [X] Add a toggle button that lets you sort the moves in either ascending or descending order.
  [ ] When someone wins, highlight the three squares that caused the win.
  [ ] When no one wins, display a message about the result being a draw.

*/

const App = () => (
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
