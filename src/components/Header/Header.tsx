import {FC} from "react";
import  {Header} from "antd/lib/layout/layout";
import logo from '../../assets/logo/kanban.png';
import Avatar from "antd/lib/avatar/avatar";
import {headerStyle} from "./HeaderStyle.ts";
import {GetAllBoardsModel} from "../../api/board/model.ts";

interface Props {
  onGoBack: () => void;
  selectedBoard: GetAllBoardsModel | null;
}

export const MainHeader: FC<Props> = ({onGoBack, selectedBoard}) => {

  return (
    <Header style={headerStyle}>
      <Avatar
        onClick={onGoBack}
        shape="square"
        size={48}
        src={logo}
      />

      {selectedBoard &&
        <h2>Kanban board - {selectedBoard.name}</h2>}
    </Header>
  );
};
