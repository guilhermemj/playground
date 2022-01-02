import React from 'react';

import { BOARD_SIZE, PLAYERS, WINNING_CONDITIONS } from '../../config';
import { GameResults, Move, SquareLocation, Player } from '../../types';
import { cloneObject, createEmptyBoard } from '../../utils';

import GameBoard from '../GameBoard';
import GameStatus from '../GameStatus';
import MoveHistory from '../MoveHistory';

import { GameProps, GameState } from './types';

export class Game extends React.Component<GameProps, GameState> {
  state: GameState = {
    currentStep: 0,
    history: [{
      stepNumber: 0,
      squares: createEmptyBoard(BOARD_SIZE),
      location: { row: -1, col: -1 },
    }],

    isHistoryDesc: true,
  }

  //  Computed
  // --------------------

  getCurrentPlayer(): Player {
    const { currentStep } = this.state;

    return PLAYERS[currentStep % PLAYERS.length];
  }

  getCurrentMove(): Move {
    const { currentStep, history } = this.state;

    const currentMove = history.find(item => item.stepNumber === currentStep);

    if (!currentMove) {
      throw new Error('currentStep is not present in history');
    }

    return currentMove;
  }

  getGameWinner(): { player: Player | null, squares: SquareLocation[] } {
    const { squares } = this.getCurrentMove();

    for (const cond of WINNING_CONDITIONS) {
      const player = squares[cond[0].row][cond[0].col];

      if (!!player && cond.every(({ row, col }) => squares[row][col] === player)) {
        return { player, squares: cond };
      }
    }

    return { player: null, squares: [] };
  }

  getIsBoardFull(): boolean {
    const { squares } = this.getCurrentMove();

    return squares.every((row) => row.every((col) => col !== null));
  }

  getGameResults(): GameResults {
    const isBoardFull = this.getIsBoardFull();
    const winnerResults = this.getGameWinner();
    const hasWinner = !!winnerResults.player;

    return {
      isGameOver: isBoardFull || hasWinner,
      isDraw: isBoardFull && !hasWinner,
      hasWinner,
      winnerPlayer: winnerResults.player,
      winnerSquares: winnerResults.squares,
    };
  }

  getMoveList(): Move[] {
    const { history, isHistoryDesc } = this.state;
    const sortSign = isHistoryDesc ? 1 : -1;

    return [...history].sort((a, b) => (a.stepNumber - b.stepNumber) * sortSign);
  }

  //  Methods
  // --------------------

  makeMove(row: number, col: number): void {
    const gameResults = this.getGameResults();

    if (gameResults.isGameOver) return;

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

  jumpTo(step: number): void {
    this.setState({ currentStep: step });
  }

  toggleHistoryDirection(): void {
    this.setState((state) => ({ isHistoryDesc: !state.isHistoryDesc }));
  }

  //  Render
  // --------------------

  render() {
    const moveList = this.getMoveList();
    const currentMove = this.getCurrentMove();
    const gameResults = this.getGameResults();

    function shouldHighlightSquare(row: number, col: number) {
      return gameResults.winnerSquares.some(
        (item) => item.row === row && item.col === col
      );
    }

    return (
      <div className="game">
        <div className="game-board">
          <GameBoard
            squares={currentMove.squares}
            shouldHighLight={shouldHighlightSquare}
            onClick={this.makeMove.bind(this)}
          />
        </div>

        <div className="game-info">
          <GameStatus
            gameResults={gameResults}
            currentPlayer={this.getCurrentPlayer()}
          />

          <button onClick={this.toggleHistoryDirection.bind(this)}>
            Sort move list: {this.state.isHistoryDesc ? '↓' : '↑'}
          </button>

          <MoveHistory
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
