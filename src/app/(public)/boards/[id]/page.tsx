"use client";

import {
  Box,
  Button,
  Grid,
  GridCol,
  Group,
  ScrollArea,
  Skeleton,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { DragDropContext, type DropResult } from "react-beautiful-dnd";
import BoardsDetailsColumn from "@/components/Boards/Details/Column";
import ColumnCreateModal from "@/components/Boards/Details/Column/CreateModal";
import { useBoardsDetailsContext } from "@/components/Boards/Details/Provider";
import { useBoardDetails } from "@/core/domains/boards/boards.hooks";
import type { Column } from "@/core/domains/boards/boards.types";
import { useTaskMove } from "@/core/domains/tasks/tasks.hooks";

export default function BoardsDetailsPage() {
  const { boardId } = useBoardsDetailsContext();

  const [createColumnOpened, createColumnActions] = useDisclosure();

  const [columns, setColumns] = useState<Column[]>();

  const boardDetails = useBoardDetails(boardId);

  const boardData = boardDetails.data;

  const taskMove = useTaskMove();

  useEffect(() => {
    if (!boardData) return;

    setColumns(boardData.columns);
  }, [boardData]);

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    const currentColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;

    const sourceIndex = source.index;
    const destIndex = destination.index;

    setColumns((prev) => {
      const newCols = prev?.map((col) => ({ ...col, tasks: [...col.tasks] }));
      if (!newCols) return;

      const sourceCol = newCols.find(
        (c) => c.id.toString() === currentColumnId,
      );
      const destCol = newCols.find(
        (c) => c.id.toString() === destinationColumnId,
      );

      if (sourceCol) {
        const [task] = sourceCol.tasks.splice(sourceIndex, 1);
        destCol?.tasks.splice(destIndex, 0, task);
      }

      return newCols;
    });

    const backup = structuredClone(columns);

    try {
      await taskMove.mutateAsync({
        id: Number(draggableId),
        newColumnId: Number(destinationColumnId),
      });
    } catch {
      setColumns(backup);
    }
  }
  return (
    <>
      <Stack>
        <Skeleton h={30} visible={boardDetails.isLoading}>
          <Grid>
            <GridCol span={{ base: 12, md: "content" }} mr="auto">
              <Title order={4}>{boardData?.name}</Title>
            </GridCol>

            <GridCol span={{ base: 12, md: "content" }}>
              <Button onClick={createColumnActions.open}>Criar coluna</Button>
            </GridCol>
          </Grid>
        </Skeleton>

        <ScrollArea w="100%">
          <Group gap="xl" wrap="nowrap" w="100%">
            <DragDropContext onDragEnd={onDragEnd}>
              {columns?.map((column) => (
                <Box key={column.id} miw={300}>
                  <BoardsDetailsColumn column={column} />
                </Box>
              ))}
            </DragDropContext>
          </Group>
        </ScrollArea>
      </Stack>

      <ColumnCreateModal
        opened={createColumnOpened}
        onClose={createColumnActions.close}
        boardId={boardId}
      />
    </>
  );
}
