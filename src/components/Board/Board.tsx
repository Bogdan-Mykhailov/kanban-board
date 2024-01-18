import Layout from "antd/lib/layout/layout";
import {cardWrapper, column, innerLayout, input} from "./BoardStyle.ts";
import {MainModal} from "../Modal/MainModal.tsx";
import {Input} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {ChangeEvent, FC, useState} from "react";
import {GetCardsByBoardIdModel} from "../../api/board/model.ts";
import {CardItem} from "../Card/CardItem.tsx";
import {cardApi} from "../../api/card/card.ts";
import {CardStatus} from "../../types/types.ts";
import {createId} from "../../utils/helpers.ts";

interface Props {
  cardsList?: GetCardsByBoardIdModel[];
  reloadCards: () => void;
}

export const Board: FC<Props> = ({cardsList, reloadCards}) => {
  const [inputValue, setInputValue] = useState('');
  const [createCardValue, setCreateCardValue] = useState('');
  const [createCardDescValue, setCreateCardDescValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string>();

  const todoCards = cardsList && cardsList.map(card => card.ToDo)
  const inProgressCards = cardsList && cardsList.map(card => card.InProgress)
  const doneCards = cardsList && cardsList.map(card => card.Done)
  const boardId = cardsList && cardsList?.find(card => card._id)

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
      const updatedData = {
        title: inputValue,
        description: textAreaValue,
        boardId: boardId
      };

      const currentCard = cardsList!
        .flatMap((card) => [...card.ToDo, ...card.InProgress, ...card.Done])
        .find((card) => card._id === selectedCardId);

      const updatedCard = { ...currentCard, ...updatedData };

      await cardApi.updateCard(updatedCard, selectedCardId!);
      reloadCards();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateCard = async () => {
    try {
      const newCard = {
        _id: createId(),
        title: createCardValue,
        description: createCardDescValue,
        status: CardStatus.TODO,
        boardId: boardId
      }

      setCreateCardValue('')
      setCreateCardDescValue('')

      await cardApi.createCard(newCard, boardId);

      reloadCards();
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteCard = async (selectedCardId: string) => {
    const currentCard = cardsList!
      .flatMap((card) => [...card.ToDo, ...card.InProgress, ...card.Done])
      .find((card) => card._id === selectedCardId);

      try {
          await cardApi.deleteCard(currentCard!._id, currentCard!.boardId);
          reloadCards();

      } catch (error) {
        console.log(error);
      }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

 const showModal2 = () => {
    setIsModal2Open(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleUpdateCard();
  };

  const handleOk2 = () => {
    setIsModal2Open(false);
    handleCreateCard();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

 const handleCancel2 = () => {
    setIsModal2Open(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value)
  }

  const handleCreateCardInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCreateCardValue(event.target.value)
  }

  const handleCreateCardDescChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCreateCardDescValue(event.target.value)
  }

  return (
    <Layout style={innerLayout}>
      <div style={column}>
        <h2>Todo</h2>

        <div style={cardWrapper}>
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
          <MainModal
            withButton
            showModal={showModal2}
            title='Create Card'
            handleOk={handleOk2}
            handleCancel={handleCancel2}
            isModalOpen={isModal2Open}
          >
            <Input
              placeholder="Add title"
              value={createCardValue}
              onChange={handleCreateCardInputChange}
              style={input}
            />

            <TextArea
              value={createCardDescValue}
              onChange={handleCreateCardDescChange}
              placeholder="Add description"
              autoSize={{minRows: 3, maxRows: 5}}
            />
          </MainModal>
          {todoCards && todoCards.map(card => card.map(c => (
            <CardItem
              key={c._id}
              title={c.title}
              description={c.description}
              onDeleteCard={() => handleDeleteCard(c._id)}
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
              onDeleteCard={() => handleDeleteCard(c._id)}
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
              onDeleteCard={() => handleDeleteCard(c._id)}
              onUpdateCard={() => handleEditDoneCard(c._id)}
            />
          )))}
        </div>
      </div>
    </Layout>
  );
};
