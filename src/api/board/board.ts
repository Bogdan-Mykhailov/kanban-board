import {api} from "../api.ts";
import {GetAllBoardsModel} from "./model.ts";


export const boardApi = {
  getAllBoards: async () => {
    const response = await api.get<GetAllBoardsModel[]>('/board/all')

    return response.data
  }
}
