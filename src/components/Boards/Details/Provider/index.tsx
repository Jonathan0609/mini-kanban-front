"use client";

import { createContext, type ReactNode, useContext } from "react";

interface ContextProps {
  boardId: number;
}
const BoardsDetailsContext = createContext({});

export const useBoardsDetailsContext = () =>
  useContext(BoardsDetailsContext) as ContextProps;

interface BoardsProviderProps {
  children: ReactNode;
  boardId: number;
}

export default function BoardsProvider(props: BoardsProviderProps) {
  return (
    <BoardsDetailsContext.Provider value={{ boardId: props.boardId }}>
      {props.children}
    </BoardsDetailsContext.Provider>
  );
}
