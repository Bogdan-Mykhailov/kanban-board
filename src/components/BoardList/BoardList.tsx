import {boardListWrapper, innerLayout} from "../../AppStyle.ts";
import {Input} from "antd";
import {GetAllBoardsModel} from "../../api/board/model.ts";
import Layout from "antd/lib/layout/layout";
import {ChangeEvent, FC, useState} from "react";
import {MainModal} from "../Modal/MainModal.tsx";
import {input} from "./BoardListStyle.ts";
import {BoardItem} from "../BoardItem/BoardItem.tsx";
import {boardApi} from "../../api/board/board.ts";

interface Props {
  boards?: GetAllBoardsModel[];
  onBoardSelect: (boardId: string) => void;
  handleReloadBoards: () => void;
}

export const BoardList: FC<Props> = ({boards, onBoardSelect, handleReloadBoards}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [value, setValue] = useState('');
  const [updatedValue, setUpdatedValue] = useState('');
  const [selectedBoardId, setSelectedBoardId] = useState<string>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCreateBoard = async () => {
    try {
      const newBoard = {
        name: value
      }

      await boardApi.createBoard(newBoard)
      setValue('')
      handleReloadBoards()
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveBoard = (id: string) => {
    const currentBoard = boards?.find(board => board._id === id)
    if (currentBoard) {
      setSelectedBoardId(id)
    }
      setIsDeleteModalOpen(true);
  };

  const handleBoardUpdate = async (selectedBoardId: string) => {
    const currentBoard = boards?.find(board => board._id === selectedBoardId)
    try {
      const updatedData = {
        name: updatedValue
      }

      await boardApi.updateBoard(currentBoard!._id, updatedData);
      handleReloadBoards();
    } catch (error) {
      console.log(error)
    }
  }

  const handleBoardDelete = async (selectedBoardId: string) => {
    const currentBoard = boards?.find(board => board._id === selectedBoardId)
    try {
      await boardApi.deleteBoard(currentBoard!._id);
      handleReloadBoards()
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditCurrentBoard = (boardId: string) => {
    const selectedBoard = boards?.find(board => board._id === boardId);
    if (selectedBoard) {
      setSelectedBoardId(selectedBoard._id);
      setUpdatedValue(selectedBoard.name)
    }
    setIsUpdateModalOpen(true);
  }

  const handleCreateBoardChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleUpdateBoardChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatedValue(event.target.value)
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleCreateBoard()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const handleOkUpdateModal = () => {
    setIsUpdateModalOpen(false);
    handleBoardUpdate(selectedBoardId!)
  };

  const handleCancelUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleOkDeleteModal = (selectedBoardId: string) => {
    const currentBoard = boards?.find(board => board._id === selectedBoardId)

    if (currentBoard) {
      handleBoardDelete(selectedBoardId);
    }
    setIsDeleteModalOpen(false);
  };

  const handleCancelDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Layout style={innerLayout}>
      <div style={boardListWrapper}>
        <MainModal
          withButton
          addBoardType
          title='Create Board'
          showModal={showModal}
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
        >
          <Input placeholder="Add board name" value={value} onChange={handleCreateBoardChange} style={input}/>
        </MainModal>
        <MainModal
          title='Update Board'
          showModal={showUpdateModal}
          isModalOpen={isUpdateModalOpen}
          handleCancel={handleCancelUpdateModal}
          handleOk={handleOkUpdateModal}
        >
          <Input placeholder="Add board name" value={updatedValue} onChange={handleUpdateBoardChange} style={input}/>
        </MainModal>
        <MainModal
          showModal={openDeleteModal}
          title='Delete Board'
          handleOk={() => handleOkDeleteModal(selectedBoardId!)}
          handleCancel={handleCancelDeleteModal}
          isModalOpen={isDeleteModalOpen}
        >
          <h4>Do you Want to delete these board?</h4>
          <p>id: {selectedBoardId}</p>
        </MainModal>
        {boards && boards.map((board: GetAllBoardsModel) => (
          <BoardItem
            boardId={board._id}
            description={board._id}
            onOpenBoardCard={() => onBoardSelect(board._id)}
            key={board._id} title={board.name}
            onDeleteBoardCard={handleRemoveBoard}
            onUpdateBoardCard={() => handleEditCurrentBoard(board._id)}
          />
        ))}
      </div>
    </Layout>
  );
};
