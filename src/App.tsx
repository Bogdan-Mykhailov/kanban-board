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


  useEffect(() => {
    handleGetAllBoards()
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
    handleGetAllCardsByBoardId(selected?._id)
  }

  const handleReloadCards = () => {
    handleGetAllCardsByBoardId(selectedBoard?._id)
  }

  const handleSearch = (inputValue: string) => {
    const filtered = boards && boards.find(board => board.name.toLowerCase().includes(inputValue.toLowerCase())) || null
    if (inputValue !== '') {
      setSelectedBoard(filtered);
    }
  }

  const handleGoBack = () => {
    setSelectedBoard(null);
  }

  return (
    <>
      <Layout style={layoutStyle}>
        <MainHeader onGoBack={handleGoBack} selectedBoard={selectedBoard}/>

        <div style={menuWrapper}>
          {selectedBoard &&
            <LeftOutlined style={goBack} onClick={handleGoBack}/>}
          <TopMenu onSearch={handleSearch}/>
        </div>
        {
          selectedBoard
            ? <Board cardsList={cards} reloadCards={handleReloadCards}/>
            : <BoardList boards={boards} onBoardSelect={handleBoardSelect}/>
        }
      </Layout>
    </>
  )
};
