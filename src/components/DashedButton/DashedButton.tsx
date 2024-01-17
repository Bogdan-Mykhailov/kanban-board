import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {FC} from "react";
import {JSX} from "react/jsx-runtime";
import IntrinsicAttributes = JSX.IntrinsicAttributes;
import {dashedButton, icon} from "./DashedButtonStyle.ts";

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
