import MoveHistoryItem from '../MoveHistoryItem';
import { MoveHistoryProps } from './types';

export const MoveHistory = ({
  history,
  currentStep,
  onClickItem = () => {},
}: MoveHistoryProps) => (
  <ol className="move-list">
    {history.map((move) => (
      <MoveHistoryItem
        key={move.stepNumber}
        move={move}
        isCurrent={currentStep === move.stepNumber}
        onClick={() => onClickItem(move.stepNumber)}
      />
    ))}
  </ol>
);

export default MoveHistory;
