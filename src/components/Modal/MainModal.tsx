import React, { useState } from 'react';
import { Input, Modal} from 'antd';
import TextArea from "antd/lib/input/TextArea";
import {DashedButton} from "../DashedButton/DashedButton.tsx";

export const MainModal: React.FC = () => {
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

  const input = {
    marginBottom: 10
  }


  const [value, setValue] = useState('');

  return (
    <>
      <DashedButton onClick={showModal} />
      <Modal title="Create task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="Add title" style={input}/>

        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add description"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Modal>
    </>
  );
};
