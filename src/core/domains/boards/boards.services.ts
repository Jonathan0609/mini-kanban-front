import { api } from "@/core/config/axios/api";
import type {
  BoardColumnCreateRequest,
  BoardCreateRequest,
  BoardCreateResponse,
  BoardData,
  BoardListResponse,
} from "./boards.types";

const path = "/boards";

export async function list() {
  const result = await api.get<BoardListResponse[]>(path);

  return result.data;
}

export async function details(boardId: number) {
  const result = await api.get<BoardData>(`${path}/${boardId}`);

  return result.data;
}

export async function create(request: BoardCreateRequest) {
  const result = await api.post<BoardCreateResponse>(path, request);

  return result.data;
}

export async function columnCreate({
  id,
  ...request
}: BoardColumnCreateRequest) {
  const result = await api.post<void>(`${path}/${id}/columns`, request);

  return result.data;
}
