import {api} from "../api.ts";
import {CreateBoardModel, GetAllBoardsModel, GetCardsByBoardIdModel} from "./model.ts";

export const boardApi = {
  createBoard: async (newBoard: CreateBoardModel) => {
    const response = await api.post<GetAllBoardsModel>('/board', newBoard);

    return response.data;
  },

  getAllBoards: async () => {
    const response = await api.get<GetAllBoardsModel[]>('/board/all');

    return response.data;
  },

  getAllCardsByBoardId: async (boardId?: string) => {
    const response = await api.get<GetCardsByBoardIdModel[]>(`/get-cards-by-board-id/${boardId}`);

    return response.data;
  },

  updateBoard: async (boardId: string, updatedBoard: CreateBoardModel) => {
    const response = await api.put(`/board/${boardId}/update`, updatedBoard);

    return response.data
  },

  deleteBoard: async (boardId: string) => {
    await api.delete(`/board/${boardId}/delete`);
  },
}
