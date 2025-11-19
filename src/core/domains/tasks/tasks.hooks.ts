import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MiniKanbanBackError } from "@/core/types/errors";
import { move, remove, update } from "./tasks.services";

export function useTaskDelete() {
  const title = "Remoção de task";
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: remove,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["boards/details"],
      });

      notifications.show({
        title,
        message: "Task removida com sucesso!",
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

export function useTaskUpdate() {
  const title = "Edição de task";
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: update,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["boards/details"],
      });

      notifications.show({
        title,
        message: "Task editada com sucesso!",
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

export function useTaskMove() {
  const title = "Movendo task";
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: move,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["boards/details"],
      });

      notifications.show({
        title,
        message: "Task movimentada com sucesso!",
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
