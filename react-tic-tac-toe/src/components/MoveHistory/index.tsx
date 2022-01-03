import { useMemo, useState } from 'react';
import MoveHistoryList from '../MoveHistoryList';
import { MoveHistoryProps } from './types';
import { SortButton, Title, Wrapper } from './styles';

export const MoveHistory = ({
  history,
  shouldHighlightItem = () => false,
  onClickItem = () => {},
}: MoveHistoryProps) => {
  const [isHistoryDesc, setIsHistoryDesc] = useState(false);

  const moveList = useMemo(() => {
    const sortSign = isHistoryDesc ? -1 : 1;

    return [...history].sort((a, b) => (a.stepNumber - b.stepNumber) * sortSign);
  }, [history, isHistoryDesc]);

  return (
    <Wrapper>
      <Title>
        Move History

        <SortButton onClick={() => setIsHistoryDesc(curr => !curr)}>
          {isHistoryDesc ? '↑' : '↓'}
        </SortButton>
      </Title>

      <MoveHistoryList
        items={moveList}
        shouldHighlightItem={shouldHighlightItem}
        onClickItem={onClickItem}
      />
    </Wrapper>
  );
};

export default MoveHistory;
