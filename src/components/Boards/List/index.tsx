"use client";

import { Anchor, Text } from "@mantine/core";
import Link from "next/link";
import TableCommon from "@/components/_commons/TableCommon";
import { useBoardList } from "@/core/domains/boards/boards.hooks";

export default function BoardsList() {
  const boardList = useBoardList();

  return (
    <TableCommon
      data={boardList?.data || []}
      columns={[
        {
          label: "Quadro",
          render: (board) => (
            <Anchor component={Link} fz="xs" href={`/boards/${board.id}`}>
              <Text lh={1} fw={600}>
                {board.name}
              </Text>
            </Anchor>
          ),
        },
      ]}
      loading={boardList.isLoading}
    />
  );
}
