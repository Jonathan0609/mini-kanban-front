import type { ReactNode } from "react";
import BoardsProvider from "@/components/Boards/Details/Provider";

export default async function BoardsDetailsLayout({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: ReactNode;
}) {
  const { id } = await params;

  return <BoardsProvider boardId={Number(id)}>{children}</BoardsProvider>;
}
