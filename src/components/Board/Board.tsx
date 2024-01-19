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

  const allCards = Array.isArray(cardsList)
    ? cardsList.flatMap(card => [...card.todo, ...card.inProgress, ...card.done])
    : [];

  const boardId = cardsList && cardsList.length > 0 ? cardsList[0]._id : '';

  const handleEditCard = (id: string) => {
    const cardToEdit = allCards?.find(card => card._id === id);
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
        boardId: boardId,
      };

      const currentCard = allCards?.find((card) => card._id === selectedCardId);

      const updatedCard = { ...currentCard, ...updatedData };

      await cardApi.updateCard(updatedCard, selectedCardId!, boardId);
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
        order: 0,
        boardId: boardId,
      };

      setCreateCardValue("");
      setCreateCardDescValue("");

      await cardApi.createCard(newCard, boardId);
      reloadCards();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCard = async (selectedCardId: string) => {
    const currentCard = cardsList!
      .flatMap((card) => [...card.todo, ...card.inProgress, ...card.done])
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
          {allCards?.filter(card => card.status === CardStatus.TODO).map(c => (
              <CardItem
                key={createId()}
                title={c.title}
                description={c.description}
                onDeleteCard={() => handleDeleteCard(c._id)}
                onUpdateCard={() => handleEditCard(c._id)}
              />
            ))}
        </div>
      </div>

      <div style={column}>
        <h2>In progress</h2>

        <div style={cardWrapper}>
          {allCards?.filter(card => card.status === CardStatus.IN_PROGRESS).map(c => (
            <CardItem
              key={c._id}
              title={c.title}
              description={c.description}
              onDeleteCard={() => handleDeleteCard(c._id)}
              onUpdateCard={() => handleEditCard(c._id)}
            />
          ))}
        </div>
      </div>

      <div style={column}>
        <h2>Done</h2>

        <div style={cardWrapper}>
          {allCards?.filter(card => card.status === CardStatus.DONE).map(c => (
            <CardItem
              key={createId()}
              title={c.title}
              description={c.description}
              onDeleteCard={() => handleDeleteCard(c._id)}
              onUpdateCard={() => handleEditCard(c._id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};
