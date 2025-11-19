"use client";

import { Box, Card, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Draggable } from "react-beautiful-dnd";
import type { Task } from "@/core/domains/boards/boards.types";
import TaskDeleteAction from "./DeleteAction";
import TaskEditModal from "./EditModal";

interface Props {
  task: Task;
  index: number;
}

export default function ColumnTask({ task, index }: Props) {
  const [editOpened, editActions] = useDisclosure();

  return (
    <>
      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              opacity: snapshot.isDragging ? 0.7 : 1,
            }}
          >
            <Card
              p="md"
              radius="lg"
              w={300}
              h={150}
              withBorder
              onClick={editActions.open}
            >
              <Stack gap="lg">
                <Group justify="space-between" wrap="nowrap">
                  <Text fz="md" fw={600} lineClamp={1} title={task.title}>
                    {task.title}
                  </Text>

                  <Box onClick={(e) => e.stopPropagation()}>
                    <TaskDeleteAction taskId={task.id} />
                  </Box>
                </Group>

                <Text fz="sm" lineClamp={3} title={task.description}>
                  {task.description}
                </Text>
              </Stack>
            </Card>
          </div>
        )}
      </Draggable>

      <TaskEditModal
        task={task}
        opened={editOpened}
        onClose={editActions.close}
      />
    </>
  );
}
