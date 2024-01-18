import {boardListWrapper, innerLayout, list, listItem} from "../../AppStyle.ts";
import {Input, List} from "antd";
import {GetAllBoardsModel} from "../../api/board/model.ts";
import Layout from "antd/lib/layout/layout";
import {FC, useState} from "react";
import {MainModal} from "../Modal/MainModal.tsx";
import {input} from "./BoardListStyle.ts";

interface Props {
  boards?: GetAllBoardsModel[];
  onBoardSelect: (boardId: string) => void;
}

export const BoardList: FC<Props> = ({boards, onBoardSelect}) => {
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
    <Layout style={innerLayout}>
      <div style={boardListWrapper}>
        <List
          bordered
          style={list}
          dataSource={boards}
          renderItem={(board: GetAllBoardsModel) => (
            <List.Item onClick={() => onBoardSelect(board._id)} style={listItem} key={board._id}>
              {board.name}
            </List.Item>)}
        />
        <MainModal
          withButton
          addBoardType
          title='Create Board'
          showModal={showModal}
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
        >
          <Input placeholder="Add board name" style={input}/>
        </MainModal>
      </div>
    </Layout>
  );
};
