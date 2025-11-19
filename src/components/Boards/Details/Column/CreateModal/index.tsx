"use client";

import { Button, Grid, GridCol, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import z from "zod/v4";
import { useBoardColumnCreate } from "@/core/domains/boards/boards.hooks";

interface Props {
  opened: boolean;
  onClose: VoidFunction;
  boardId: number;
}

export const schema = z.object({
  name: z
    .string({ error: "Campo não pode ser nulo" })
    .nonempty({ error: "Informe o nome" }),
});

export function useColumnCreateValidateForm() {
  return zod4Resolver(schema);
}

export default function ColumnCreateModal({ boardId, ...modalProps }: Props) {
  type ColumnCreateFormValues = z.infer<typeof schema>;

  const validate = useColumnCreateValidateForm();

  const form = useForm<ColumnCreateFormValues>({
    mode: "uncontrolled",
    initialValues: { name: "" },
    validate,
    validateInputOnBlur: true,
  });

  const boardColumnCreate = useBoardColumnCreate();

  const handleClose = () => {
    modalProps.onClose();
    form.reset();
  };

  const handleSubmit = async (values: ColumnCreateFormValues) => {
    await boardColumnCreate.mutateAsync({ id: boardId, name: values.name });

    handleClose();
  };

  return (
    <Modal title="Criação da coluna" {...modalProps} onClose={handleClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Nome"
            {...form.getInputProps("name")}
            key={form.key("name")}
          />

          <Grid>
            <GridCol span={{ base: 12, md: "content" }} mr="auto">
              <Button
                disabled={boardColumnCreate.isPending}
                variant="default"
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </GridCol>

            <GridCol span={{ base: 12, md: "content" }}>
              <Button type="submit" loading={boardColumnCreate.isPending}>
                Criar coluna
              </Button>
            </GridCol>
          </Grid>
        </Stack>
      </form>
    </Modal>
  );
}
