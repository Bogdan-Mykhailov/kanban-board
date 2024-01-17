import Layout from "antd/lib/layout/layout";
import {cardWrapper, column, innerLayout, input} from "./BoardStyle.ts";
import {MainModal} from "../Modal/MainModal.tsx";
import {Input} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {ChangeEvent, FC, useState} from "react";
import {CardStatus, GetCardsByBoardIdModel} from "../../api/board/model.ts";
import {CardItem} from "../Card/CardItem.tsx";
import {cardApi} from "../../api/card/card.ts";
import {useForceUpdate} from "../../hooks/useForceUpdate.tsx";

interface Props {
  cardsList?: GetCardsByBoardIdModel[];
}

export const Board: FC<Props> = ({cardsList}) => {
  const [inputValue, setInputValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string>();

  const todoCards = cardsList && cardsList.map(card => card.ToDo)
  const inProgressCards = cardsList && cardsList.map(card => card.InProgress)
  const doneCards = cardsList && cardsList.map(card => card.Done)
  const boardId = cardsList && cardsList?.find(card => card._id)

  //Todo need to fix forceUpdate
  const forceUpdate = useForceUpdate();

  const handleEditTodoCard = (id: string) => {
    const cardToEdit = cardsList?.flatMap(card => card.ToDo)
      .find(card => card._id === id);
    if (cardToEdit) {
      setInputValue(cardToEdit.title);
      setTextAreaValue(cardToEdit.description);
      setSelectedCardId(id)
    }

    setIsModalOpen(true);
  };
  const handleEditInProgressCard = (id: string) => {
    const cardToEdit = cardsList?.flatMap(card => card.InProgress)
      .find(card => card._id === id);
    if (cardToEdit) {
      setInputValue(cardToEdit.title);
      setTextAreaValue(cardToEdit.description);
      setSelectedCardId(id)
    }

    setIsModalOpen(true);
  };
  const handleEditDoneCard = (id: string) => {
    const cardToEdit = cardsList?.flatMap(card => card.Done)
      .find(card => card._id === id);
    if (cardToEdit) {
      setInputValue(cardToEdit.title);
      setTextAreaValue(cardToEdit.description);
      setSelectedCardId(id)
    }

    setIsModalOpen(true);
  };

  const handleUpdateCard = async () => {
    try {
      const newCard = {
        title: inputValue,
        description: textAreaValue,
        status: CardStatus.TODO,
        boardId: boardId
      }

      await cardApi.updateCard(newCard, selectedCardId!);
    } catch (error) {
      console.log(error)
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleUpdateCard();
    forceUpdate();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value)
  }

  return (
    <Layout style={innerLayout}>
      <MainModal
        showModal={showModal}
        title='Update Card'
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
      >
        <Input
          placeholder="Add title"
          value={inputValue}
          onChange={handleInputChange}
          style={input}
        />

        <TextArea
          value={textAreaValue}
          onChange={handleTextAreaChange}
          placeholder="Add description"
          autoSize={{minRows: 3, maxRows: 5}}
        />
      </MainModal>
      <div style={column}>
        <h2>Todo</h2>

        <div style={cardWrapper}>
          {todoCards && todoCards.map(card => card.map(c => (
            <CardItem
              key={c._id}
              title={c.title}
              description={c.description}
              onDeleteCard={() => {}}
              onUpdateCard={() => handleEditTodoCard(c._id)}
            />
          )))}
        </div>
      </div>

      <div style={column}>
        <h2>In progress</h2>

        <div style={cardWrapper}>
          {inProgressCards && inProgressCards.map(card => card.map(c => (
            <CardItem
              key={c._id}
              title={c.title}
              description={c.description}
              onDeleteCard={() => {}}
              onUpdateCard={() => handleEditInProgressCard(c._id)}
            />
          )))}
        </div>
      </div>

      <div style={column}>
        <h2>Done</h2>

        <div style={cardWrapper}>
          {doneCards && doneCards.map(card => card.map(c => (
            <CardItem
              key={c._id}
              title={c.title}
              description={c.description}
              onDeleteCard={() => {}}
              onUpdateCard={() => handleEditDoneCard(c._id)}
            />
          )))}
        </div>
      </div>
    </Layout>
  );
};
