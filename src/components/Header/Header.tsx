import {CSSProperties} from "react";
import  {Header} from "antd/lib/layout/layout";
import logo from '../../assets/logo/kanban.png';
import Avatar from "antd/lib/avatar/avatar";

const headerStyle: CSSProperties = {
  color: '#1677ff',
  height: 64,
  width: '100%',
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#d9d9d9',
  marginBottom: '40px',
  display: 'flex',
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: 'row'
};

export const MainHeader = () => {
  return (
    <Header style={headerStyle}>
      <Avatar shape="square" size={48} src={logo} />
      <h2>title</h2>
    </Header>
  );
};
