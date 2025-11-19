import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MiniKanbanBackError } from "@/core/types/errors";
import { columnCreate, create, details, list } from "./boards.services";

export function useBoardList() {
  const result = useQuery({
    queryKey: ["boards/list"],
    queryFn: () => list(),
  });

  return result;
}

export function useBoardDetails(boardId: number) {
  const result = useQuery({
    queryKey: ["boards/details", { boardId }],
    queryFn: () => details(boardId),
    enabled: !!boardId,
  });

  return result;
}

export function useBoardCreate() {
  const title = "Criação do quadro";
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: create,
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["boards/list"] });

      notifications.show({
        title,
        message: "Quadro criado com sucesso!",
      });
    },
    onError(error: MiniKanbanBackError) {
      notifications.show({
        title,
        message: error.response.data.message,
        color: "red",
      });
    },
  });

  return result;
}

export function useBoardColumnCreate() {
  const title = "Criação do coluna";
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: columnCreate,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["boards/details"],
      });

      notifications.show({
        title,
        message: "Coluna criada com sucesso!",
      });
    },
    onError(error: MiniKanbanBackError) {
      notifications.show({
        title,
        message: error.response.data.message,
        color: "red",
      });
    },
  });

  return result;
}
