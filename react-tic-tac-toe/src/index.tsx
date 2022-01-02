import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

import { BOARD_SIZE, PLAYERS, WIN_CONDITIONS } from './config';
import SquaresGame from './components/SquaresGame';

const App = () => (
  <React.StrictMode>
    <SquaresGame
      players={PLAYERS}
      boardSize={BOARD_SIZE}
      winConditions={WIN_CONDITIONS}
    />
  </React.StrictMode>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
