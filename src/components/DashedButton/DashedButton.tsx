import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {FC} from "react";
import {JSX} from "react/jsx-runtime";
import IntrinsicAttributes = JSX.IntrinsicAttributes;
import {dashedButton, dashedButtonGray, icon} from "./DashedButtonStyle.ts";

interface Props extends IntrinsicAttributes {
  onClick: () => void;
  addBoardType: boolean
}

export const DashedButton: FC<Props> = ({ onClick, addBoardType = false }) => {
  return (
    <Button
      onClick={onClick}
      type="dashed"
      style={addBoardType ? dashedButtonGray : dashedButton}
    >
      <PlusOutlined style={icon} />
    </Button>
  );
};
