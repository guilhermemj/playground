import classNames from 'classnames';
import { MoveHistoryListItemProps } from './types';
import { Button, ListItem } from './styles';

export const MoveHistoryListItem = ({
  item,
  highlight = false,
  onClick = () => {},
}: MoveHistoryListItemProps) => {
  const description = (item.stepNumber > 0
    ? `Go to move ${item.stepNumber} (${item.location?.col}, ${item.location?.row})`
    : `Go to game start`
  );

  return (
    <ListItem className={classNames({ highlight })}>
      <Button onClick={onClick}>
        {description}
      </Button>
    </ListItem>
  );
};

export default MoveHistoryListItem;
