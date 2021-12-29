export const MoveListItem = ({ move, isCurrent, onClick }) => {
  const description = (move.stepNumber > 0
    ? `Go to move ${move.stepNumber} (${move.location.col}, ${move.location.row})`
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

export const MoveList = ({ history, currentStep, onClickItem }) => (
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
