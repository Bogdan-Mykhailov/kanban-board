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
