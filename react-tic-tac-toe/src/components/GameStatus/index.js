export const GameStatus = ({ gameResults, currentPlayer }) => {
  if (!gameResults.isGameOver) {
    return (
      <div>Next player: {currentPlayer}</div>
    );
  }

  if (gameResults.isDraw) {
    return (
      <div>Game Over. It's a draw!</div>
    );
  }

  if (gameResults.hasWinner) {
    return (
      <div>Winner: {gameResults.winnerPlayer}. Congratulations!!</div>
    );
  }

  return (
    <div>You're not supposed to see this.</div>
  )
};

export default GameStatus;
