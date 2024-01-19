import {CardModel} from "../card/model.ts";

interface ColumnsType {
  todo: string[];
  inProgress: string[];
  done: string[];
}

export interface GetAllBoardsModel {
  _id: string,
  name: string,
  columns: ColumnsType
}

export interface GetCardsByBoardIdModel {
  _id: string;
  todo: CardModel[];
  inProgress: CardModel[];
  done: CardModel[];
}

export interface CreateBoardModel {
  name: string,
}
