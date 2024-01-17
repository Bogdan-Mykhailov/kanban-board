import React from 'react';
import {DeleteOutlined, EditOutlined, } from '@ant-design/icons';
import { Card } from 'antd';
import {card} from "./CardItemStyle.ts";

const { Meta } = Card;

export const CardItem: React.FC = () => (
  <Card
    style={card}
    actions={[
      <EditOutlined key="edit" />,
      <DeleteOutlined key="delete" />
    ]}
  >
    <Meta
      title="Card title"
      description="This is the description"
    />
  </Card>
);
