import React from 'react';
import {DeleteOutlined, EditOutlined, } from '@ant-design/icons';
import { Card } from 'antd';

const { Meta } = Card;

const card = {
  width: 300,
  marginBottom: 10
}

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
