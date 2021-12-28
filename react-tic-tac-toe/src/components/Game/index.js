import React from 'react';

import { calculateWinner } from '../../utils';
import Board from '../Board';

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick(i) {
    const { history, xIsNext, stepNumber } = this.state;
    const { squares } = history[stepNumber];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();

    newSquares[i] = xIsNext ? 'X' : 'O';

    this.setState({
      history: [...history.slice(0, stepNumber + 1), { squares: newSquares }],
      stepNumber: stepNumber + 1,
      xIsNext: !xIsNext,
    });
  }

  render() {
    const { history, xIsNext, stepNumber } = this.state;
    const { squares } = history[stepNumber];

    const winner = calculateWinner(squares);
    const nextPlayer = xIsNext ? 'X' : 'O';
    const status = winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`;

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move ${move}` : `Go to game start`;

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

export default Game;
