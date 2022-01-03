import { useMemo, useState } from 'react';

import { GameResults, Move, Player, WinCondition, BoardState } from '../../global/types';
import { cloneObject, createEmptyBoard } from '../../utils';

import GameBoard from '../GameBoard';
import GameStatus from '../GameStatus';
import MoveHistory from '../MoveHistory';

import { GameProps } from './types';
import { GameWrapper, GameBoardWrapper, GameHistoryWrapper } from './styles';

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

  return (
    <GameWrapper>
      <GameBoardWrapper>
        <GameStatus
          gameResults={gameResults}
          currentPlayer={currentPlayer}
        />

        <GameBoard
          squares={boardState}
          shouldHighLight={shouldHighlightSquare}
          onClickSquare={makeMove}
        />
      </GameBoardWrapper>

      <GameHistoryWrapper>
        <MoveHistory
          history={history}
          shouldHighlightItem={(step) => currentStep === step}
          onClickItem={(step) => setCurrentStep(step)}
        />
      </GameHistoryWrapper>
    </GameWrapper>
  );
};

export default SquaresGame;
