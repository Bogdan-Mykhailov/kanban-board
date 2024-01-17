import {api} from "../api.ts";
import {GetCardsByBoardIdModel} from "../board/model.ts";
import {UploadCardModel} from "./model.ts";

export const cardApi = {
  updateCard: async (data: UploadCardModel, cardId: string, boardId?: GetCardsByBoardIdModel) => {

    const response = await api.put(`/board/${boardId}/card/update/${cardId}`, data)

    return response.data
  }
}
