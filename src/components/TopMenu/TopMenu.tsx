import {Input} from 'antd';
import {topMenu} from "./TopMenuStyle.ts";
import {FC} from "react";

const {Search} = Input;

interface Props {
  onSearch: (inputValue: string) => void;
}

export const TopMenu: FC<Props> = ({onSearch}) => {
  return (
    <Search
      placeholder="Enter a board name here..."
      enterButton="Load"
      size="large"
      loading={false}
      style={topMenu}
      onSearch={onSearch}
    />
  );
};
