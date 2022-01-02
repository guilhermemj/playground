import { useMemo, useState } from 'react';

import { GameResults, Move, Player, WinCondition, BoardState } from '../../types';
import { cloneObject, createEmptyBoard } from '../../utils';

import GameBoard from '../GameBoard';
import GameStatus from '../GameStatus';
import MoveHistory from '../MoveHistory';

import { GameProps } from './types';

function getCurrentPlayer(players: Player[], currentStep: number): Player {
  return players[currentStep % players.length];
}

function getBoardState(history: Move[], currentStep: number): BoardState {
  const currentMove = history.find(item => item.stepNumber === currentStep);

  if (!currentMove) {
    throw new RangeError('currentStep is not present in history');
  }

  return currentMove.boardState;
}

function getGameResults(boardState: BoardState, winConditions: WinCondition[]): GameResults {
  const isBoardFull = boardState.every((row) => row.every((col) => col !== null));

  let hasWinner = false;
  let winner = null;
  let winnerSquares = [] as GameResults['winnerSquares'];

  for (const cond of winConditions) {
    const player = boardState[cond[0].row][cond[0].col];

    if (player !== null && cond.every(({ row, col }) => boardState[row][col] === player)) {
      hasWinner = true;
      winner = player;
      winnerSquares = cond;
      break;
    }
  }

  return {
    isGameOver: isBoardFull || hasWinner,
    isDraw: isBoardFull && !hasWinner,
    hasWinner,
    winner,
    winnerSquares,
  };
}

function getMoveList(history: Move[], isHistoryDesc: Boolean): Move[] {
  const sortSign = isHistoryDesc ? -1 : 1;

  return [...history].sort((a, b) => (a.stepNumber - b.stepNumber) * sortSign);
}

export const SquaresGame = ({
  players,
  boardSize,
  winConditions,
}: GameProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [history, setHistory] = useState<Move[]>([{
    stepNumber: 0,
    boardState: createEmptyBoard(boardSize),
    location: { row: -1, col: -1 },
  }]);

  const boardState = useMemo(() => getBoardState(history, currentStep), [history, currentStep]);
  const currentPlayer = useMemo(() => getCurrentPlayer(players, currentStep), [players, currentStep]);
  const gameResults = useMemo(() => getGameResults(boardState, winConditions), [boardState, winConditions]);

  function makeMove(row: number, col: number): void {
    if (gameResults.isGameOver || boardState[row][col] !== null) {
      return
    };

    const newMove = {
      location: { row, col },
      stepNumber: currentStep + 1,
      boardState: cloneObject(boardState),
    };

    newMove.boardState[row][col] = currentPlayer;

    const newHistory = history.slice(0, currentStep + 1);

    newHistory.push(newMove);

    setCurrentStep(newMove.stepNumber);
    setHistory(newHistory);
  }

  function shouldHighlightSquare(row: number, col: number) {
    return gameResults.winnerSquares.some(
      (item) => item.row === row && item.col === col
    );
  }

  // TODO: Move to MoveHistory
  const [isHistoryDesc, setIsHistoryDesc] = useState(false);
  const moveList = useMemo(() => getMoveList(history, isHistoryDesc), [history, isHistoryDesc]);

  return (
    <div className="game">
      <div className="game-board">
        <GameBoard
          squares={boardState}
          shouldHighLight={shouldHighlightSquare}
          onClickSquare={makeMove}
        />
      </div>

      <div className="game-info">
        <GameStatus
          gameResults={gameResults}
          currentPlayer={currentPlayer}
        />

        <button onClick={() => setIsHistoryDesc(curr => !curr)}>
          Sort move list: {isHistoryDesc ? '↑' : '↓'}
        </button>

        <MoveHistory
          currentStep={currentStep}
          history={moveList}
          onClickItem={(step) => setCurrentStep(step)}
        />
      </div>
    </div>
  );
};

export default SquaresGame;
