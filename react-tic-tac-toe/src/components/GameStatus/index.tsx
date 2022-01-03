import { GameResults, Player } from '../../global/types';
import { GameStatusProps } from './types';
import { Text, Wrapper } from './styles';

function getStatusMessage(gameResults: GameResults, currentPlayer: Player): string {
  if (!gameResults.isGameOver) {
    return `Next player: ${currentPlayer}`;
  }

  if (gameResults.isDraw) {
    return "Game Over. It's a draw!";
  }

  if (gameResults.hasWinner) {
    return `Winner: ${gameResults.winner}. Congratulations!!`;
  }

  return "You're not supposed to see this.";
}

export const GameStatus = ({
  gameResults,
  currentPlayer,
}: GameStatusProps) => (
  <Wrapper>
    <Text>
      {getStatusMessage(gameResults, currentPlayer)}
    </Text>
  </Wrapper>
);

export default GameStatus;
