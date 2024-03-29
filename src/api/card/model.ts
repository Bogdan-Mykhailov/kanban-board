import {CardStatus} from "../../types/types.ts";

export interface CardModel {
  _id: string,
  title: string,
  description: string,
  status: CardStatus,
  boardId: string,
  order: number
}

export interface UploadCardModel {
  _id?: string,
  title?: string,
  description?: string,
  status?: CardStatus,
  boardId?: string,
}
