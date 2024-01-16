import './AppStyle.ts'
import {TopMenu} from "./components/TopMenu/TopMenu.tsx";
import Layout from "antd/lib/layout/layout";
import {MainHeader} from "./components/Header/Header.tsx";
import {innerLayout, layoutStyle} from "./AppStyle.ts";
import {CSSProperties, useEffect, useState} from "react";
import {boardApi} from "./api/board/board.ts";
import {GetAllBoardsModel} from "./api/board/model.ts";
import {List} from "antd";
import {DashedButton} from "./components/DashedButton/DashedButton.tsx";

export const App = () => {
  const [boards, setBoards] = useState<GetAllBoardsModel[]>();

  useEffect(() => {
    handleGetAllBoards()
  }, []);


  const handleGetAllBoards = async () => {
    const res = await boardApi.getAllBoards()

    setBoards(res)
  }

  const list: CSSProperties = {
    width: '300px',
    height: '100%'
  }

  const listItem: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const boardListWrapper: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: "space-between"
  }

  const openBoardModal = () => {

  }

  return (
    <>
      <Layout style={layoutStyle}>
        <MainHeader/>

        <TopMenu/>

        <Layout style={innerLayout}>
          <div style={boardListWrapper}>
            <List
              bordered
              style={list}
              dataSource={boards}
              renderItem={(board: GetAllBoardsModel) => (
                <List.Item style={listItem} key={board.id}>
                  {board.name}
                </List.Item>)}
            />

            <DashedButton onClick={openBoardModal} />
          </div>
        </Layout>
        {/*<Layout style={innerLayout}>*/}
        {/*  <div style={column}>*/}
        {/*    <h2>Todo</h2>*/}

        {/*    <div style={cardWrapper}>*/}
        {/*      <CardItem/>*/}
        {/*      <CardItem/>*/}
        {/*    </div>*/}
        {/*    <MainModal />*/}
        {/*  </div>*/}

        {/*  <div style={column}>*/}
        {/*    <h2>In progress</h2>*/}

        {/*    <div style={cardWrapper}>*/}
        {/*      <CardItem/>*/}
        {/*      <CardItem/>*/}
        {/*      <CardItem/>*/}
        {/*      <CardItem/>*/}
        {/*      <CardItem/>*/}
        {/*      <CardItem/>*/}
        {/*      <CardItem/>*/}
        {/*    </div>*/}
        {/*  </div>*/}

        {/*  <div style={column}>*/}
        {/*    <h2>Done</h2>*/}

        {/*    <div style={cardWrapper}>*/}
        {/*      <CardItem/>*/}
        {/*      <CardItem/>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</Layout>*/}
      </Layout>
    </>
  )
};
