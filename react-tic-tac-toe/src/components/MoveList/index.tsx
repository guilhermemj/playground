import { MoveListItemProps, MoveListProps } from './types';

export const MoveListItem = ({
  move,
  isCurrent = false,
  onClick = () => {},
}: MoveListItemProps) => {
  const description = (move.stepNumber > 0
    ? `Go to move ${move.stepNumber} (${move.location?.col}, ${move.location?.row})`
    : `Go to game start`
  );

  return (
    <li className={isCurrent ? 'selected-item' : ''}>
      <button onClick={() => onClick(move.stepNumber)}>
        {description}
      </button>
    </li>
  );
};

export const MoveList = ({
  history,
  currentStep,
  onClickItem = () => {},
}: MoveListProps) => (
  <ol className="move-list">
    {history.map((move) => (
      <MoveListItem
        key={move.stepNumber}
        move={move}
        isCurrent={currentStep === move.stepNumber}
        onClick={onClickItem}
      />
    ))}
  </ol>
);

export default MoveList;
