import {CardModel} from "../card/model.ts";

export interface GetAllBoardsModel {
  _id: string,
  name: string,
  todo: string[];
  inProgress: string[];
  done: string[];
}

export interface GetCardsByBoardIdModel {
  _id: string;
  name: string;
  todo: CardModel[];
  inProgress: CardModel[];
  done: CardModel[];
}

export interface CreateBoardModel {
  name: string,
}
