import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {CSSProperties, FC} from "react";
import {JSX} from "react/jsx-runtime";
import IntrinsicAttributes = JSX.IntrinsicAttributes;

const dashedButton = {
  width: 298,
  minHeight: 146
}
const icon: CSSProperties = {
  fontSize: '48px',
  color: '#d9d9d9'
}

interface Props extends IntrinsicAttributes {
  onClick: () => void;
}

export const DashedButton: FC<Props> = ({ onClick }) => {
  return (
    <Button onClick={onClick} type="dashed" style={dashedButton}>
      <PlusOutlined style={icon} />
    </Button>
  );
};
