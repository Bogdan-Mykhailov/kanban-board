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

export enum CardStatus {
  TODO = 'todo',
  IN_PROGRESS = 'inProgress',
  DONE = 'done',
}

export interface CardModel {
  _id: string,
  title: string,
  description: string,
  status: CardStatus,
  boardId: string,
}

export interface GetCardsByBoardIdModel {
  _id: string;
  ToDo: CardModel[];
  InProgress: CardModel[];
  Done: CardModel[];
}

