"use client";

import {
  ActionIcon,
  Grid,
  GridCol,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

import { Droppable } from "react-beautiful-dnd";
import type { Column } from "@/core/domains/boards/boards.types";
import ColumnTask from "./Task";
import TaskCreateModal from "./Task/CreateModal";

interface Props {
  column: Column;
}

export default function BoardsDetailsColumn({ column }: Props) {
  const [open, handlers] = useDisclosure();

  return (
    <>
      <Stack gap="sm" h="100%">
        <Grid>
          <GridCol span={{ base: 12, md: "content" }} mr="auto">
            <Text fz="md" fw={600}>
              {column.name}
            </Text>
          </GridCol>

          <GridCol span={{ base: 12, md: "content" }}>
            <ActionIcon variant="subtle" onClick={handlers.open}>
              <IconPlus size={18} />
            </ActionIcon>
          </GridCol>
        </Grid>

        <ScrollArea h="80vh" type="hover">
          <Droppable
            droppableId={column.id.toString()}
            isDropDisabled={false}
            isCombineEnabled={false}
            ignoreContainerClipping={false}
          >
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  padding: 8,
                  background: snapshot.isDraggingOver
                    ? "rgba(0,0,0,0.05)"
                    : "transparent",
                }}
              >
                <Stack gap="md">
                  {column.tasks.map((task, index) => (
                    <ColumnTask key={task.id} task={task} index={index} />
                  ))}
                </Stack>

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ScrollArea>
      </Stack>

      <TaskCreateModal
        opened={open}
        onClose={handlers.close}
        columnId={column.id}
      />
    </>
  );
}
