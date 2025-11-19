export interface BoardListResponse {
  id: number;
  name: string;
}

export interface BoardData {
  id: number;
  name: string;
  columns: Column[];
}

export interface BoardCreateRequest {
  name: string;
}

export interface BoardCreateResponse {
  id: number;
}

export interface BoardColumnCreateRequest {
  id: number;
  name: string;
}

export interface Column {
  id: number;
  name: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
}
