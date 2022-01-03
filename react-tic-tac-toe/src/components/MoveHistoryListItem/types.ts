import { Move } from "../../global/types";

export type MoveHistoryListItemProps = {
  item: Move;
  highlight?: boolean;
  onClick?: () => void;
};
