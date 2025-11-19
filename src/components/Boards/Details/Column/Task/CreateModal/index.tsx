"use client";

import { Button, Grid, GridCol, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import z from "zod/v4";
import { useColumnTaskCreate } from "@/core/domains/columns/columns.hooks";

interface Props {
  opened: boolean;
  onClose: VoidFunction;
  columnId: number;
}

export const schema = z.object({
  title: z
    .string({ error: "Campo não pode ser nulo" })
    .nonempty({ error: "Informe o nome" }),
  description: z.string().optional(),
});

export function useTaskCreateValidateForm() {
  return zod4Resolver(schema);
}

export default function TaskCreateModal({ columnId, ...modalProps }: Props) {
  type TaskCreateFormValues = z.infer<typeof schema>;

  const validate = useTaskCreateValidateForm();

  const form = useForm<TaskCreateFormValues>({
    mode: "uncontrolled",
    initialValues: { title: "" },
    validate,
    validateInputOnBlur: true,
  });

  const columnTaskCreate = useColumnTaskCreate();

  const handleClose = () => {
    modalProps.onClose();
    form.reset();
  };

  const handleSubmit = async (values: TaskCreateFormValues) => {
    await columnTaskCreate.mutateAsync({
      id: columnId,
      title: values.title,
      description: values.description,
    });

    handleClose();
  };

  return (
    <Modal title="Criação da task" {...modalProps} onClose={handleClose}>
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
                disabled={columnTaskCreate.isPending}
                variant="default"
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </GridCol>

            <GridCol span={{ base: 12, md: "content" }}>
              <Button type="submit" loading={columnTaskCreate.isPending}>
                Criar task
              </Button>
            </GridCol>
          </Grid>
        </Stack>
      </form>
    </Modal>
  );
}
