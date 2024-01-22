import React, {ReactNode} from 'react';
import {Modal} from 'antd';
import {DashedButton} from "../DashedButton/DashedButton.tsx";

interface Props {
  children: ReactNode;
  title: string;
  showModal: () => void;
  handleOk: () => void;
  handleCancel: () => void;
  isModalOpen: boolean;
  withButton?: boolean;
  addBoardType?: boolean
}

export const MainModal: React.FC<Props> = (
  {
    children,
    title,
    showModal,
    isModalOpen,
    handleCancel,
    handleOk,
    withButton = false,
    addBoardType = false
  }) => {

  return (
    <>
    {
      withButton
      && <DashedButton
        onClick={showModal}
        addBoardType={addBoardType}
      />
    }
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};
