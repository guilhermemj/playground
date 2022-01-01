import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

import Game from './components/Game';

const App = () => (
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
