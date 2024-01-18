import {CardModel} from "../card/model.ts";

interface ColumnsType {
  ToDo: string[];
  InProgress: string[];
  Done: string[];
}

export interface GetAllBoardsModel {
  _id: string,
  name: string,
  columns: ColumnsType
}

export interface GetCardsByBoardIdModel {
  _id: string;
  ToDo: CardModel[];
  InProgress: CardModel[];
  Done: CardModel[];
}

export interface CreateBoardModel {
  name: string,
}
