import {DeleteOutlined, EditOutlined, EnterOutlined} from "@ant-design/icons";
import {Card} from "antd";
import {boardCard} from "./BoardItemStyle.ts";
import {FC} from "react";

const { Meta } = Card;

interface Props {
  boardId: string;
  title: string;
  description: string
  onUpdateBoardCard: () => void
  onDeleteBoardCard: (id: string) => void
  onOpenBoardCard: () => void
}

export const BoardItem: FC<Props> = ({boardId, title, description, onUpdateBoardCard, onDeleteBoardCard, onOpenBoardCard}) => {


  return (
    <Card
      style={boardCard}
      actions={[
        <EnterOutlined onClick={onOpenBoardCard} key="enter"/>,
        <EditOutlined onClick={onUpdateBoardCard} key="edit" />,
        <DeleteOutlined onClick={() => onDeleteBoardCard(boardId)} key="delete" />
      ]}
    >
      <Meta
        title={title}
        description={`id: ${description}`}
      />
    </Card>
  );
};
