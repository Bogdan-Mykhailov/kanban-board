import React from 'react';
import {DeleteOutlined, EditOutlined, } from '@ant-design/icons';
import { Card } from 'antd';

const { Meta } = Card;

export const CardItem: React.FC = () => (
  <Card
    style={{ width: 300 }}
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
