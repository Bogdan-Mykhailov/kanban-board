import {CardModel} from "../../api/card/model.ts";
import {FC} from "react";
import {CardStatus} from "../../types/types.ts";
import {CardItem} from "../Card/CardItem.tsx";
import {cardWrapper} from "./ColumnStyle.ts";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

interface Props {
  cards: CardModel[];
  handleDeleteCard: (id: string) => void
  handleEditCard: (id: string) => void
  columnStatus: CardStatus
}

export const Column: FC<Props> = ({cards, columnStatus, handleDeleteCard, handleEditCard}) => {
  const {attributes, listeners, setNodeRef, transition, transform} = useSortable({
    id: columnStatus,
    data: {
      type: 'column',
      status: columnStatus,
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    ...cardWrapper
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {cards?.filter(card => card.status === columnStatus).map(c => (
        <CardItem
          isDragging
          card={c}
          key={c._id}
          onDeleteCard={() => handleDeleteCard(c._id)}
          onUpdateCard={() => handleEditCard(c._id)}
        />
      ))}
    </div>
  );
};
