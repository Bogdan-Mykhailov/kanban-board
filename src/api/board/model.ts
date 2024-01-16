interface ColumnsType {
  ToDo: string[];
  InProgress: string[];
  Done: string[];
}

export interface GetAllBoardsModel {
  id: string,
  name: string,
  columns: ColumnsType
}
