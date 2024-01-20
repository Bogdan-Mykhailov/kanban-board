import {Input} from 'antd';
import {topMenu} from "./TopMenuStyle.ts";
import {FC, useState} from "react";

const {Search} = Input;

interface Props {
  onSearch: (boardId: string) => void;
}

export const TopMenu: FC<Props> = ({onSearch}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    onSearch(searchValue);
    setSearchValue('')
  };

  return (
    <Search
      placeholder="Enter a board id here..."
      enterButton="Load"
      size="large"
      loading={false}
      style={topMenu}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onSearch={handleSearch}
    />
  );
};
