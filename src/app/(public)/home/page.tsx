"use client";

import { Button, Grid, GridCol, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import BoardsCreateModal from "@/components/Boards/CreateModal";
import BoardsList from "@/components/Boards/List";

export default function HomePage() {
  const [createOpened, createActions] = useDisclosure();

  return (
    <>
      <Stack>
        <Grid>
          <GridCol span={{ base: 12, md: "content" }} mr="auto">
            <Title order={4}>Listagem de quadros</Title>
          </GridCol>

          <GridCol span={{ base: 12, md: "content" }}>
            <Button onClick={createActions.open}>Criar quadro</Button>
          </GridCol>
        </Grid>

        <BoardsList />
      </Stack>

      <BoardsCreateModal opened={createOpened} onClose={createActions.close} />
    </>
  );
}
