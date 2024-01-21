import {api} from "../api.ts";
import {UploadCardModel} from "./model.ts";


export const cardApi = {
  createCard: async (newCard: UploadCardModel, boardId: string) => {
    const response = await api.post<UploadCardModel>(`/board/${boardId}/card`, newCard);

    return response.data
  },

  updateCard: async (data: UploadCardModel, cardId: string, boardId: string) => {
    const response = await api.put(`/board/${boardId}/card/update/${cardId}`, data)

    return response.data
  },

  deleteCard: async (cardId: string, boardId: string) => {
    await api.delete(`/board/${boardId}/card/delete/${cardId}`)
  }
}
