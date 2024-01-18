import {GetCardsByBoardIdModel} from "../board/model.ts";
import {CardStatus} from "../../types/types.ts";

export interface CardModel {
  _id: string,
  title: string,
  description: string,
  status: CardStatus,
  boardId: string,
}

export interface UploadCardModel {
  title?: string,
  description?: string,
  status?: CardStatus,
  boardId?: GetCardsByBoardIdModel,
}
