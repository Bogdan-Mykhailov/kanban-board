import {FC} from 'react';
import {DeleteOutlined, EditOutlined,} from '@ant-design/icons';
import {Card} from 'antd';
import {cardStyle, dragged} from "./CardItemStyle.ts";
import {CSS} from "@dnd-kit/utilities";
import {useSortable} from "@dnd-kit/sortable";
import {CardModel} from "../../api/card/model.ts";
import {CardStatus} from "../../types/types.ts";

const {Meta} = Card;

interface Props {
  card: CardModel;
  onUpdateCard: () => void;
  onDeleteCard: () => void;
  isDragging?: boolean;
}

export const CardItem: FC<Props> = ({card, onUpdateCard, onDeleteCard, isDragging}) => {
  const {title, description, _id, status, order} = card;

  const {attributes, listeners, setNodeRef, transition, transform} = useSortable({
    id: _id,
    data: {
      type: 'card',
      card: card,
      status: status,
      order: order
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    ...cardStyle
  }

  const doneStyle = {
    opacity: 0.4,
    border: '1px dashed red',
    ...cardStyle
  }

  return (
    <Card
      style={status === CardStatus.DONE ? doneStyle : isDragging ? style : dragged}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      actions={[
        <EditOutlined onClick={onUpdateCard} key="edit"/>,
        <DeleteOutlined onClick={onDeleteCard} key="delete"/>
      ]}
    >
      <Meta
        title={title}
        description={description}
      />
    </Card>
  )
};
