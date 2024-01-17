import React, {ReactNode, useState} from 'react';
import {Modal} from 'antd';
import {DashedButton} from "../DashedButton/DashedButton.tsx";

interface Props {
  children: ReactNode;
  title: string;
}

export const MainModal: React.FC<Props> = ({children, title}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <DashedButton onClick={showModal} />
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
