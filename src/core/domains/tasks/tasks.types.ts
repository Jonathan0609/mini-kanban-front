export interface TaskUpdateRequest {
  id: number;
  title: string;
  description?: string;
}

export interface TaskMoveRequest {
  id: number;
  newColumnId: number;
}
