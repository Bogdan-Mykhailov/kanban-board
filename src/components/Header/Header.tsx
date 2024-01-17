import {FC} from "react";
import  {Header} from "antd/lib/layout/layout";
import logo from '../../assets/logo/kanban.png';
import Avatar from "antd/lib/avatar/avatar";
import {headerStyle} from "./HeaderStyle.ts";

interface Props {
  onGoBack: () => void
}

export const MainHeader: FC<Props> = ({onGoBack}) => {

  return (
    <Header style={headerStyle}>
      <Avatar
        onClick={onGoBack}
        shape="square"
        size={48}
        src={logo}
      />
    </Header>
  );
};
