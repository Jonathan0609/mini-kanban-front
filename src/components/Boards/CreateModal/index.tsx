"use client";

import { Button, Grid, GridCol, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import z from "zod/v4";
import { useBoardCreate } from "@/core/domains/boards/boards.hooks";

interface Props {
  opened: boolean;
  onClose: VoidFunction;
}

export const schema = z.object({
  name: z
    .string({ error: "Campo não pode ser nulo" })
    .nonempty({ error: "Informe o nome" }),
});

export function useBoardsCreateValidateForm() {
  return zod4Resolver(schema);
}

export default function BoardsCreateModal(props: Props) {
  type BoardCreateFormValues = z.infer<typeof schema>;

  const validate = useBoardsCreateValidateForm();

  const form = useForm<BoardCreateFormValues>({
    mode: "uncontrolled",
    initialValues: { name: "" },
    validate,
    validateInputOnBlur: true,
  });

  const boardCreate = useBoardCreate();

  const handleClose = () => {
    props.onClose();
    form.reset();
  };

  const handleSubmit = async (values: BoardCreateFormValues) => {
    await boardCreate.mutateAsync({ name: values.name });

    handleClose();
  };

  return (
    <Modal title="Criação do quadro" {...props} onClose={handleClose}>
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
                disabled={boardCreate.isPending}
                variant="default"
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </GridCol>

            <GridCol span={{ base: 12, md: "content" }}>
              <Button type="submit" loading={boardCreate.isPending}>
                Criar quadro
              </Button>
            </GridCol>
          </Grid>
        </Stack>
      </form>
    </Modal>
  );
}
