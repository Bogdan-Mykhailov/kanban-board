import {api} from "../api.ts";
import {GetAllBoardsModel, GetCardsByBoardIdModel} from "./model.ts";


export const boardApi = {
  getAllBoards: async () => {
    const response = await api.get<GetAllBoardsModel[]>('/board/all')

    return response.data
  },
  getAllCardsByBoardId: async (boardId?: string) => {
    const response = await api.get<GetCardsByBoardIdModel[]>(`/get-cards-by-board-id/${boardId}`)

    return response.data
  }
}
