import './AppStyle.ts'
import {TopMenu} from "./components/TopMenu/TopMenu.tsx";
import Layout from "antd/lib/layout/layout";
import {MainHeader} from "./components/Header/Header.tsx";
import {goBack, layoutStyle, menuWrapper} from "./AppStyle.ts";
import {useEffect, useState} from "react";
import {boardApi} from "./api/board/board.ts";
import {GetAllBoardsModel, GetCardsByBoardIdModel} from "./api/board/model.ts";
import {BoardList} from "./components/BoardList/BoardList.tsx";
import {Board} from "./components/Board/Board.tsx";
import {LeftOutlined} from "@ant-design/icons";

export const App = () => {
  const [boards, setBoards] = useState<GetAllBoardsModel[]>();
  const [cards, setCards] = useState<GetCardsByBoardIdModel>();
  const [selectedBoard, setSelectedBoard] = useState<GetAllBoardsModel | null>(null);

  const storedBoardId = localStorage.getItem('selectedBoardId');

  useEffect(() => {
    if (storedBoardId) {
      handleGetAllCardsByBoardId(storedBoardId);
    } else {
      handleGetAllBoards();
    }
  }, []);

  const handleGetAllBoards = async () => {
    const res = await boardApi.getAllBoards();
    setBoards(res);
  }

  const handleGetAllCardsByBoardId = async (id?: string) => {
    const res = await boardApi.getBoardById(id);

    setCards(res);
  }

  const handleBoardSelect = (boardId: string) => {
    const selected = boards?.filter((board) => board._id === boardId)[0] || null;
    setSelectedBoard(selected);
    localStorage.setItem('selectedBoardId', boardId);
    handleGetAllCardsByBoardId(boardId)
  }

  const handleReloadCards = () => {
    handleGetAllCardsByBoardId(storedBoardId!)
  }

  const handleReloadBoards = () => {
    handleGetAllBoards()
  }

  const handleSearchById = (boardId: string) => {
    const foundBoard = boards && boards
      .find((board) => board._id === boardId);
    if (foundBoard) {
      setSelectedBoard(foundBoard);
      localStorage.setItem('selectedBoardId', foundBoard._id);
      handleGetAllCardsByBoardId(foundBoard._id);
    }
  };

  const handleGoBack = () => {
    setSelectedBoard(null);
    localStorage.removeItem('selectedBoardId');
    handleGetAllBoards();
  }

  return (
    <>
      <Layout style={layoutStyle}>
        <MainHeader
          onGoBack={handleGoBack}
          selectedBoard={selectedBoard}
        />

        <div style={menuWrapper}>
          {storedBoardId &&
            <LeftOutlined
              title='Back'
              style={goBack}
              onClick={handleGoBack}
            />}
          {!storedBoardId && <TopMenu onSearch={handleSearchById}/>}
        </div>
        {
          storedBoardId
            ? <Board board={cards} reloadCards={handleReloadCards}/>
            : (
              <BoardList
                boards={boards}
                onBoardSelect={handleBoardSelect}
                handleReloadBoards={handleReloadBoards}
              />
            )
        }
      </Layout>
    </>
  )
};
