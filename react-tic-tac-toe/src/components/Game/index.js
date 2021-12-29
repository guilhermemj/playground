import React from 'react';

import { BOARD_SIZE, PLAYERS, WINNING_CONDITIONS } from '../../config';
import { cloneObject, createBoard } from '../../utils';

import Board from '../Board';
import MoveList from '../MoveList';

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

      isHistoryDesc: true,
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
        return { winner: player, squares: cond };
      }
    }

    return { winner: null, squares: [] };
  }

  getIsBoardFull() {
    const { squares } = this.getCurrentMove();

    return squares.every((row) => row.every((col) => col !== null));
  }

  getIsGameOver() {
    return this.getIsBoardFull() || !!this.getGameWinner().winner;
  }

  getMoveList() {
    const { history, isHistoryDesc } = this.state;
    const sortSign = isHistoryDesc ? 1 : -1;

    return [...history].sort((a, b) => (a.stepNumber - b.stepNumber) * sortSign);
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

  toggleHistoryDirection() {
    this.setState((state) => ({ isHistoryDesc: !state.isHistoryDesc }));
  }

  //  Render
  // --------------------

  render() {
    const moveList = this.getMoveList();
    const currentMove = this.getCurrentMove();
    const results = this.getGameWinner();

    function shouldHighlightSquare(row, col) {
      return results.squares.some(
        (item) => item.row === row && item.col === col
      );
    }

    const nextPlayer = this.getCurrentPlayer();
    const status = results.winner ? `Winner: ${results.winner}` : `Next player: ${nextPlayer}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentMove.squares}
            shouldHighLight={shouldHighlightSquare}
            onClick={this.makeMove.bind(this)}
          />
        </div>

        <div className="game-info">
          <div>{ status }</div>

          <button onClick={this.toggleHistoryDirection.bind(this)}>
            Sort move list: {this.state.isHistoryDesc ? '↓' : '↑'}
          </button>

          <MoveList
            currentStep={currentMove.stepNumber}
            history={moveList}
            onClickItem={this.jumpTo.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Game;
