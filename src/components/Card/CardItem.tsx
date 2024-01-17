import {FC} from 'react';
import {DeleteOutlined, EditOutlined, } from '@ant-design/icons';
import { Card } from 'antd';
import {card} from "./CardItemStyle.ts";

const { Meta } = Card;

interface Props {
  title: string;
  description: string;
  onUpdateCard: () => void
  onDeleteCard: () => void
}

export const CardItem: FC<Props> = ({title, description, onUpdateCard, onDeleteCard}) => (
  <Card
    style={card}
    actions={[
      <EditOutlined onClick={onUpdateCard} key="edit" />,
      <DeleteOutlined onClick={onDeleteCard} key="delete" />
    ]}
  >
    <Meta
      title={title}
      description={description}
    />
  </Card>
);
