import { api } from "@/core/config/axios/api";
import type { TaskMoveRequest, TaskUpdateRequest } from "./tasks.types";

const path = "/tasks";

export async function remove(id: number) {
  const result = await api.delete<void>(`${path}/${id}`);

  return result.data;
}

export async function update({ id, ...request }: TaskUpdateRequest) {
  const result = await api.put<void>(`${path}/${id}`, request);

  return result.data;
}

export async function move({ id, ...request }: TaskMoveRequest) {
  const result = await api.patch<void>(`${path}/${id}/move`, request);

  return result.data;
}
