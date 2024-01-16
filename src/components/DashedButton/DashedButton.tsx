import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {CSSProperties} from "react";

const dashedButton = {
  width: 298,
  minHeight: 146
}
const icon: CSSProperties = {
  fontSize: '48px',
  color: '#d9d9d9'
}

export const DashedButton = () => {
  return (
    <Button type="dashed" style={dashedButton}>
      <PlusOutlined style={icon} />
    </Button>
  );
};
