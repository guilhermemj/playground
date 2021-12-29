import React from 'react';

import { BOARD_SIZE, PLAYERS, WINNING_CONDITIONS } from '../../config';
import { cloneObject, createBoard } from '../../utils';

import Board from '../Board';

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      history: [{
        stepNumber: 0,
        squares: createBoard(BOARD_SIZE),
        location: null,
      }],
    };
  }

  //  Computed
  // --------------------

  getCurrentPlayer() {
    const { currentStep } = this.state;

    return PLAYERS[currentStep % PLAYERS.length];
  }

  getCurrentMove() {
    const { currentStep, history } = this.state;

    return history.find(item => item.stepNumber === currentStep);
  }

  getGameWinner() {
    const { squares } = this.getCurrentMove();

    for (const cond of WINNING_CONDITIONS) {
      const player = squares[cond[0].row][cond[0].col];

      if (!!player && cond.every(({ row, col }) => squares[row][col] === player)) {
        return player
      }
    }

    return null;
  }

  getIsBoardFull() {
    const { squares } = this.getCurrentMove();

    return squares.every((row) => row.every((col) => col !== null));
  }

  getIsGameOver() {
    return this.getIsBoardFull() || !!this.getGameWinner();
  }

  //  Methods
  // --------------------

  makeMove(row, col) {
    if (this.getIsGameOver()) return;

    const currentMove = this.getCurrentMove();

    if (currentMove.squares[row][col] !== null) return;

    const newMove = {
      stepNumber: currentMove.stepNumber + 1,
      squares: cloneObject(currentMove.squares),
      location: { row, col },
    };

    newMove.squares[row][col] = this.getCurrentPlayer();

    const newHistory = this.state.history.slice(0, currentMove.stepNumber + 1);

    newHistory.push(newMove);

    this.setState({
      currentStep: newMove.stepNumber,
      history: newHistory,
    });
  }

  jumpTo(step) {
    this.setState({ currentStep: step });
  }

  //  Render
  // --------------------

  render() {
    const { squares } = this.getCurrentMove();

    const winner = this.getGameWinner();
    const nextPlayer = this.getCurrentPlayer();
    const status = winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`;

    const moveList = this.state.history.map((move) => {
      const description = (move.stepNumber > 0
        ? `Go to move ${move.stepNumber} (${move.location.col}, ${move.location.row})`
        : `Go to game start`
      );

      return (
        <li key={move.stepNumber}>
          <button onClick={this.jumpTo.bind(this, move.stepNumber)}>
            {description}
          </button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={this.makeMove.bind(this)} />
        </div>

        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moveList }</ol>
        </div>
      </div>
    );
  }
}

export default Game;
