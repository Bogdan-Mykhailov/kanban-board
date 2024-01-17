import './AppStyle.ts'
import {TopMenu} from "./components/TopMenu/TopMenu.tsx";
import Layout from "antd/lib/layout/layout";
import {MainHeader} from "./components/Header/Header.tsx";
import {goBack, layoutStyle} from "./AppStyle.ts";
import {useEffect, useState} from "react";
import {boardApi} from "./api/board/board.ts";
import {GetAllBoardsModel} from "./api/board/model.ts";
import {BoardList} from "./components/BoardList/BoardList.tsx";
import {Board} from "./components/Board/Board.tsx";
import {LeftOutlined} from "@ant-design/icons";

export const App = () => {
  const [boards, setBoards] = useState<GetAllBoardsModel[]>();
  const [selectedBoard, setSelectedBoard] = useState<GetAllBoardsModel | null>(null);


  useEffect(() => {
    handleGetAllBoards()
  }, []);

  const handleGetAllBoards = async () => {
    const res = await boardApi.getAllBoards()

    setBoards(res)
  }

  const handleBoardSelect = (boardId: string) => {
    const selected = boards?.find((board) => board.id === boardId) || null;

    setSelectedBoard(selected)
  }

  const handleGoBack = () => {
    setSelectedBoard(null);
  }

  return (
    <>
      <Layout style={layoutStyle}>
        <MainHeader onGoBack={handleGoBack}/>

        {selectedBoard &&
          <LeftOutlined style={goBack} onClick={handleGoBack}/>}

        <TopMenu/>
        {
          selectedBoard
            ? <Board/>
            : <BoardList boards={boards} onBoardSelect={handleBoardSelect}/>
        }
      </Layout>
    </>
  )
};
