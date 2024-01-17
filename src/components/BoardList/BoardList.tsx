import {boardListWrapper, innerLayout, list, listItem} from "../../AppStyle.ts";
import {Input, List} from "antd";
import {GetAllBoardsModel} from "../../api/board/model.ts";
import Layout from "antd/lib/layout/layout";
import {FC} from "react";
import {MainModal} from "../Modal/MainModal.tsx";
import {input} from "./BoardListStyle.ts";

interface Props {
  boards?: GetAllBoardsModel[];
  onBoardSelect: (boardId: string) => void;
}

export const BoardList: FC<Props> = ({boards, onBoardSelect}) => {
  return (
    <Layout style={innerLayout}>
      <div style={boardListWrapper}>
        <List
          bordered
          style={list}
          dataSource={boards}
          renderItem={(board: GetAllBoardsModel) => (
            <List.Item onClick={() => onBoardSelect(board._id)} style={listItem} key={board._id}>
              {board.name}
            </List.Item>)}
        />
        <MainModal title='Create Board'>
          <Input placeholder="Add board name" style={input}/>
        </MainModal>
      </div>
    </Layout>
  );
};
