import MoveHistoryListItem from '../MoveHistoryListItem';
import { MoveHistoryListProps } from './types';
import { List } from './styles';

export const MoveHistoryList = ({
  items,
  shouldHighlightItem = () => false,
  onClickItem = () => {},
}: MoveHistoryListProps) => (
  <List>
    {items.map((item) => (
      <MoveHistoryListItem
        key={item.stepNumber}
        item={item}
        highlight={shouldHighlightItem(item.stepNumber)}
        onClick={() => onClickItem(item.stepNumber)}
      />
    ))}
  </List>
);

export default MoveHistoryList;
