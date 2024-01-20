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
  const [cards, setCards] = useState<GetCardsByBoardIdModel[]>();
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
    const res = await boardApi.getAllCardsByBoardId(id);

    setCards(res);
  }

  const handleBoardSelect = (boardId: string) => {
    const selected = boards && boards?.filter((board) => board._id === boardId)[0] || null;
    setSelectedBoard(selected);
    localStorage.setItem('selectedBoardId', boardId);
    handleGetAllCardsByBoardId(selected?._id)
  }

  const handleReloadCards = () => {
    handleGetAllCardsByBoardId(storedBoardId!)
  }

  const handleReloadBoards = () => {
    handleGetAllBoards()
  }

  const handleSearch = (inputValue: string) => {
    const filtered = boards && boards.find(board => board.name.toLowerCase().includes(inputValue.toLowerCase())) || null
    if (inputValue !== '') {
      setSelectedBoard(filtered);
    }
  }

  const handleGoBack = () => {
    setSelectedBoard(null);
    localStorage.removeItem('selectedBoardId');
    handleGetAllBoards();
  }

  return (
    <>
      <Layout style={layoutStyle}>
        <MainHeader onGoBack={handleGoBack} selectedBoard={selectedBoard}/>

        <div style={menuWrapper}>
          {storedBoardId &&
            <LeftOutlined style={goBack} onClick={handleGoBack}/>}
          <TopMenu onSearch={handleSearch}/>
        </div>
        {
          storedBoardId
            ? <Board cardsList={cards} reloadCards={handleReloadCards}/>
            : <BoardList boards={boards} onBoardSelect={handleBoardSelect} handleReloadBoards={handleReloadBoards}/>
        }
      </Layout>
    </>
  )
};
