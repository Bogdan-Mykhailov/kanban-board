import Layout from "antd/lib/layout/layout";
import {column, innerLayout, input} from "./BoardStyle.ts";
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
import {Column} from "../Column/Column.tsx";
import {cardWrapper} from "../Column/ColumnStyle.ts";

interface Props {
  board?: GetCardsByBoardIdModel;
  reloadCards: () => void;
}

export const Board: FC<Props> = ({board, reloadCards}) => {
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3
    }
  }))

  useEffect(() => {
    if (board) {
      const allCards = [...board.todo, ...board.inProgress, ...board.done];
      setCards(allCards);
    }
  }, [board]);

  const todoCards = board?.todo || [];
  const inProgressCards = board?.inProgress || [];
  const doneCards = board?.done || [];
  const allCards = [...todoCards, ...inProgressCards, ...doneCards];
  const [inputValue, setInputValue] = useState('');
  const [createCardValue, setCreateCardValue] = useState('');
  const [createCardDescValue, setCreateCardDescValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string>();
  const [currentCard, setCurrentCard] = useState<CardModel | null>(null);
  const [currentColumn, setCurrentColumn] = useState<never | null>(null);
  const [cards, setCards] = useState<CardModel[]>(allCards);
  const boardId = board?._id;
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

  const handleRemoveCard = (id: string) => {
    const cardToRemove = allCards?.find(card => card._id === id);
    if (cardToRemove) {
      setSelectedCardId(id)
    }

    setIsDeleteModalOpen(true);
  };

  const handleEditCard = (id: string) => {
    const cardToEdit = allCards?.find(card => card._id === id);
    if (cardToEdit) {
      setInputValue(cardToEdit.title);
      setTextAreaValue(cardToEdit.description);
      setSelectedCardId(id)
    }

    setIsModalUpdateOpen(true);
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

  const showCreateModal = () => {
    setIsModalCreateOpen(true);
  };

  const handleCreateCardOk = () => {
    setIsModalCreateOpen(false);
    handleCreateCard();
  };

  const handleCreateCancel = () => {
    setIsModalCreateOpen(false);
  };

  const showUpdateModal = () => {
    setIsModalUpdateOpen(true);
  };

  const handleUpdateCardOk = () => {
    setIsModalUpdateOpen(false);
    handleUpdateCard();
  };

  const handleUpdateCancel = () => {
    setIsModalUpdateOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleOkDeleteModal = (selectedCardId: string) => {
    setIsDeleteModalOpen(false);
    handleDeleteCard(selectedCardId);
  };

  const handleCancelDeleteModal = () => {
    setIsDeleteModalOpen(false);
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
    setCurrentColumn(null)
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
      status: allCards[overIndex]?.status,
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

    console.log(currentColumn)
    const isActiveATask = active.data.current?.type === 'card';
    const isOverAColumn = over.data.current?.type === 'column';

    if (isActiveATask && isOverAColumn && over.id) {
      setCards((allCards) => {
        const activeIndex = allCards?.findIndex((card) => card._id === activeCardId);

        const updatedStatus = {
          status: over.id as CardStatus,
          order: 0,
          boardId: boardId,
        };

        (async () => {
          try {
            await cardApi.updateCard(updatedStatus, activeCardId.toString(), boardId!);
            reloadCards();
          } catch (error) {
            console.error(error);
          }
        })();

        return arrayMove(allCards!, activeIndex!, activeIndex!);
      });
    }
  };

  return (
    <DndContext
      onDragOver={onDragOver}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <Layout style={innerLayout}>
          <div style={column}>
            <h2>Todo</h2>

            <div id={CardStatus.TODO} style={cardWrapper}>
              <MainModal
                showModal={showUpdateModal}
                title='Update Task'
                handleOk={handleUpdateCardOk}
                handleCancel={handleUpdateCancel}
                isModalOpen={isModalUpdateOpen}
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
                showModal={showCreateModal}
                title='Create Task'
                handleOk={handleCreateCardOk}
                handleCancel={handleCreateCancel}
                isModalOpen={isModalCreateOpen}
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
              <MainModal
                showModal={openDeleteModal}
                title='Delete Task'
                handleOk={() => handleOkDeleteModal(selectedCardId!)}
                handleCancel={handleCancelDeleteModal}
                isModalOpen={isDeleteModalOpen}
              >
                <h4>Do you Want to delete these task?</h4>
                <p>id: {selectedCardId}</p>
              </MainModal>
              <Column
                columnStatus={CardStatus.TODO}
                cards={cards}
                handleDeleteCard={handleRemoveCard}
                handleEditCard={handleEditCard}
              />
            </div>
          </div>

          <div style={column}>
            <h2>In progress</h2>
            <Column
              columnStatus={CardStatus.IN_PROGRESS}
              cards={cards}
              handleDeleteCard={handleRemoveCard}
              handleEditCard={handleEditCard}
            />
          </div>

          <div style={column}>
            <h2>Done</h2>

            <Column
              columnStatus={CardStatus.DONE}
              cards={cards}
              handleDeleteCard={handleRemoveCard}
              handleEditCard={handleEditCard}
            />
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
