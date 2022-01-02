import { MoveHistoryItemProps } from './types';

export const MoveHistoryItem = ({
  move,
  isCurrent = false,
  onClick = () => {},
}: MoveHistoryItemProps) => {
  const description = (move.stepNumber > 0
    ? `Go to move ${move.stepNumber} (${move.location?.col}, ${move.location?.row})`
    : `Go to game start`
  );

  return (
    <li className={isCurrent ? 'selected-item' : ''}>
      <button onClick={onClick}>
        {description}
      </button>
    </li>
  );
};

export default MoveHistoryItem;
