import Layout from "antd/lib/layout/layout";
import {cardWrapper, column, innerLayout, input} from "./BoardStyle.ts";
import {MainModal} from "../Modal/MainModal.tsx";
import {Input} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {ChangeEvent, FC, useEffect, useState} from "react";
import {GetCardsByBoardIdModel} from "../../api/board/model.ts";
import {CardItem} from "../Card/CardItem.tsx";
import {cardApi} from "../../api/card/card.ts";
import {CardStatus} from "../../types/types.ts";
import {createId} from "../../utils/helpers.ts";
import {
  closestCenter,
  DndContext,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {CardModel} from "../../api/card/model.ts";
import {createPortal} from "react-dom";

interface Props {
  cardsList?: GetCardsByBoardIdModel;
  reloadCards: () => void;
}

export const Board: FC<Props> = ({cardsList, reloadCards}) => {
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3
    }
  }))

  useEffect(() => {
    if (cardsList) {
      const allCards = [...cardsList.todo, ...cardsList.inProgress, ...cardsList.done];
      setCards(allCards);
    }
  }, [cardsList]);

  const todoCards = cardsList?.todo || [];
  const inProgressCards = cardsList?.inProgress || [];
  const doneCards = cardsList?.done || [];

  const allCards = [...todoCards, ...inProgressCards, ...doneCards];

  const [inputValue, setInputValue] = useState('');
  const [createCardValue, setCreateCardValue] = useState('');
  const [createCardDescValue, setCreateCardDescValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string>();
  const [currentCard, setCurrentCard] = useState<CardModel | null>(null);
  const [cards, setCards] = useState<CardModel[]>(allCards);

  const boardId = cardsList?._id;
  const taskIds = allCards.map(card => card._id)

  const handleCreateCard = async () => {
    try {
      const newCard = {
        _id: createId(),
        title: createCardValue,
        description: createCardDescValue,
        status: CardStatus.TODO,
        boardId: boardId,
      };

      setCreateCardValue("");
      setCreateCardDescValue("");

      await cardApi.createCard(newCard, boardId!);
      reloadCards();
    } catch (error) {
      console.log(error);
    }
  };

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
        _id: selectedCardId,
        title: inputValue,
        description: textAreaValue,
        boardId: boardId,
      };

      await cardApi.updateCard(updatedData!, selectedCardId!, boardId!);
      reloadCards();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCard = async (selectedCardId: string) => {
    const taskId = allCards.find(card => card._id === selectedCardId)
    try {
      await cardApi.deleteCard(taskId!._id, boardId!);
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

  const onDragStart = (event: DragMoveEvent) => {

    if (event.active.data.current?.type === 'card') {
      setCurrentCard(event.active.data.current.card)
    }
  }

  const onDragEnd = async (event: DragMoveEvent) => {
    setCurrentCard(null)

    const {active, over} = event;

    if (!over) {
      return;
    }

    const activeCardId = active.id;
    const overCardId = over?.id;

    if (activeCardId === overCardId) {
      return;
    }

    const activeIndex = allCards?.findIndex(card => card._id === activeCardId);
    const overIndex = allCards?.findIndex(card => card._id === overCardId);

    if (activeIndex === undefined || overIndex === undefined) {
      return;
    }

    setCards(allCards => {

      return arrayMove(allCards!, activeIndex!, overIndex!)
    })

    const updatedOrder = {
      order: allCards[overIndex]?.order,
      status: allCards[overIndex].status,
      boardId: boardId
    };

    try {
      await cardApi.updateCard(updatedOrder, activeCardId.toString(), boardId!);
      reloadCards();
    } catch (error) {
      console.error(error);
    }
  };

  const onDragOver = async (event: DragOverEvent) => {
    const {active, over} = event;

    if (!over) {
      return;
    }

    const activeCardId = active.id;
    const overCardId = over?.id;

    if (activeCardId === overCardId) {
      return;
    }

    const isActiveATask = active.data.current?.type === 'task';
    const isOverATask = over.data.current?.type === 'task';

    if (!isActiveATask) {
      return;
    }

    if (isActiveATask && isOverATask) {
      setCards(allCards => {
        const activeIndex = allCards?.findIndex(card => card._id === activeCardId);
        const overIndex = allCards?.findIndex(card => card._id === overCardId);

        // const updatedOrder = {
        //   order: allCards[overIndex]?.order,
        //   status: allCards[overIndex].status,
        //   boardId: boardId,
        // };
        //
        // (async () => {
        //   try {
        //     await cardApi.updateCard(updatedOrder, active.data.current?.card.id, boardId!);
        //     reloadCards();
        //   } catch (error) {
        //     console.error(error);
        //   }
        // })();

        return arrayMove(allCards!, activeIndex!, overIndex!);
      });
    }

  };

  return (
    <DndContext onDragOver={onDragOver} sensors={sensors} collisionDetection={closestCenter} onDragStart={onDragStart}
                onDragEnd={onDragEnd}>
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
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

              {cards?.filter(card => card.status === CardStatus.TODO).map(c => (
                <CardItem
                  isDragging
                  card={c}
                  key={c._id}
                  onDeleteCard={() => handleDeleteCard(c._id)}
                  onUpdateCard={() => handleEditCard(c._id)}
                />
              ))}
            </div>
          </div>

          <div style={column}>
            <h2>In progress</h2>

            <div style={cardWrapper}>
              {cards?.filter(card => card.status === CardStatus.IN_PROGRESS).map(c => (
                <CardItem
                  isDragging
                  card={c}
                  key={c._id}
                  onDeleteCard={() => handleDeleteCard(c._id)}
                  onUpdateCard={() => handleEditCard(c._id)}
                />
              ))}
            </div>
          </div>

          <div style={column}>
            <h2>Done</h2>

            <div style={cardWrapper}>
              {cards?.filter(card => card.status === CardStatus.DONE).map(c => (
                <CardItem
                  isDragging
                  card={c}
                  key={c._id}
                  onDeleteCard={() => handleDeleteCard(c._id)}
                  onUpdateCard={() => handleEditCard(c._id)}
                />
              ))}
            </div>
          </div>
        </Layout>
        {createPortal(<DragOverlay>
          {currentCard && (
            <CardItem
              card={currentCard}
              onDeleteCard={() => handleDeleteCard(currentCard._id)}
              onUpdateCard={() => handleEditCard(currentCard._id)}
            />
          )}
        </DragOverlay>, document.body)}
      </SortableContext>
    </DndContext>
  );
};
