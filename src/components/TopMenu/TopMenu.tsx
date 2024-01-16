import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const topMenu = {
  width: '75%',
  marginBottom: '40px'
}

export const TopMenu: React.FC = () => (
    <Search
      placeholder="Enter a board name here..."
      enterButton="Load"
      size="large"
      loading={false}
      style={topMenu}
    />
);
