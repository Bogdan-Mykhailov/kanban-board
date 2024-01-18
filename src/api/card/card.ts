import {api} from "../api.ts";
import {GetCardsByBoardIdModel} from "../board/model.ts";
import {UploadCardModel} from "./model.ts";

export const cardApi = {
  createCard: async (newCard: UploadCardModel, boardId?: GetCardsByBoardIdModel) => {
    const response = await api.post<UploadCardModel>(`/board/${boardId?._id}/card`, newCard);

    return response.data
  },

  updateCard: async (data: UploadCardModel, cardId: string, boardId?: GetCardsByBoardIdModel) => {
    const response = await api.put(`/board/${boardId?._id}/card/update/${cardId}`, data)

    return response.data
  },

  deleteCard: async (cardId: string, boardId: string) => {
    await api.delete(`/board/${boardId}/card/delete/${cardId}`)
  }
}
