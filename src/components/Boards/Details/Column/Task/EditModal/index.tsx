"use client";

import { Button, Grid, GridCol, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useEffect } from "react";
import z from "zod/v4";
import type { Task } from "@/core/domains/boards/boards.types";
import { useTaskUpdate } from "@/core/domains/tasks/tasks.hooks";

interface Props {
  opened: boolean;
  onClose: VoidFunction;
  task: Task;
}

export const schema = z.object({
  title: z
    .string({ error: "Campo não pode ser nulo" })
    .nonempty({ error: "Informe o nome" }),
  description: z.string().optional(),
});

export function useTaskEditValidateForm() {
  return zod4Resolver(schema);
}

export default function TaskEditModal({ task, ...modalProps }: Props) {
  type TaskEditFormValues = z.infer<typeof schema>;

  const validate = useTaskEditValidateForm();

  const form = useForm<TaskEditFormValues>({
    mode: "uncontrolled",
    initialValues: { title: "" },
    validate,
    validateInputOnBlur: true,
  });

  const taskUpdate = useTaskUpdate();

  const handleClose = () => {
    modalProps.onClose();
    form.reset();
  };

  const handleSubmit = async (values: TaskEditFormValues) => {
    await taskUpdate.mutateAsync({
      id: task.id,
      title: values.title,
      description: values.description,
    });

    handleClose();
  };

  useEffect(() => {
    if (!task || !modalProps.opened) return;

    form.setValues({ description: task.description, title: task.title });

    form.resetDirty();
  }, [modalProps.opened, task]);

  return (
    <Modal title="Edição da task" {...modalProps} onClose={handleClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Grid>
            <GridCol span={12}>
              <TextInput
                label="Título"
                {...form.getInputProps("title")}
                key={form.key("title")}
              />
            </GridCol>

            <GridCol span={12}>
              <TextInput
                label="Descrição"
                {...form.getInputProps("description")}
                key={form.key("description")}
              />
            </GridCol>
          </Grid>

          <Grid>
            <GridCol span={{ base: 12, md: "content" }} mr="auto">
              <Button
                disabled={taskUpdate.isPending}
                variant="default"
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </GridCol>

            <GridCol span={{ base: 12, md: "content" }}>
              <Button type="submit" loading={taskUpdate.isPending}>
                Criar task
              </Button>
            </GridCol>
          </Grid>
        </Stack>
      </form>
    </Modal>
  );
}
