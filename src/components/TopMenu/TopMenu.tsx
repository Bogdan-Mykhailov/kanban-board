import { Input } from 'antd';
import {topMenu} from "./TopMenuStyle.ts";

const { Search } = Input;

export const TopMenu = () => (
    <Search
      placeholder="Enter a board name here..."
      enterButton="Load"
      size="large"
      loading={false}
      style={topMenu}
    />
);
