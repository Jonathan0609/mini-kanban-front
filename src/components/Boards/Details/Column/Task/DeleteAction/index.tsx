import {
  ActionIcon,
  Button,
  Grid,
  GridCol,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useTaskDelete } from "@/core/domains/tasks/tasks.hooks";

interface Props {
  taskId: number;
}

export default function TaskDeleteAction({ taskId }: Props) {
  const taskDelete = useTaskDelete();

  const [deleteOpened, deleteActions] = useDisclosure();

  const handleDelete = async () => {
    await taskDelete.mutateAsync(taskId);

    deleteActions.close();
  };

  return (
    <>
      <ActionIcon variant="subtle" color="red" onClick={deleteActions.open}>
        <IconTrash size={18} />
      </ActionIcon>

      <Modal
        title="Remoção de task"
        opened={deleteOpened}
        onClose={deleteActions.close}
      >
        <Stack>
          <Text>Deseja realmente remover a task?</Text>

          <Grid>
            <GridCol span={{ base: 12, md: "content" }} mr="auto">
              <Button variant="default" onClick={deleteActions.close}>
                Cancelar
              </Button>
            </GridCol>

            <GridCol span={{ base: 12, md: "content" }}>
              <Button
                variant="light"
                color="red"
                loading={taskDelete.isPending}
                onClick={handleDelete}
              >
                Remover
              </Button>
            </GridCol>
          </Grid>
        </Stack>
      </Modal>
    </>
  );
}
