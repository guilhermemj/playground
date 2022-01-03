import * as React from 'react';

import { BOARD_SIZE, PLAYERS, WIN_CONDITIONS } from './config';
import SquaresGame from './components/SquaresGame';

export const App = () => (
  <React.StrictMode>
    <SquaresGame
      players={PLAYERS}
      boardSize={BOARD_SIZE}
      winConditions={WIN_CONDITIONS}
    />
  </React.StrictMode>
);

export default App;
