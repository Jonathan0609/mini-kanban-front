import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MiniKanbanBackError } from "@/core/types/errors";
import { createTask } from "./columns.services";

export function useColumnTaskCreate() {
  const title = "Criação de task";
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: createTask,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["boards/details"],
      });

      notifications.show({
        title,
        message: "Task criada com sucesso!",
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
