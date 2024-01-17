import {CardStatus, GetCardsByBoardIdModel} from "../board/model.ts";

export interface UploadCardModel {
  title: string,
  description: string,
  status: CardStatus,
  boardId?: GetCardsByBoardIdModel,
}
