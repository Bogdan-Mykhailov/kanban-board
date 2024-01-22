import axios from "axios";

export const api = axios.create({
  baseURL: 'https://kanban-board-server-1yjw.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
})
