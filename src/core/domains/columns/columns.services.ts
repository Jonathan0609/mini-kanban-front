import { api } from "@/core/config/axios/api";
import type { ColumnTaskCreateRequest } from "./columns.types";

const path = "/columns";

export async function createTask({ id, ...request }: ColumnTaskCreateRequest) {
  const result = await api.post<void>(`${path}/${id}/tasks`, request);

  return result.data;
}
