import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHistoryItem } from "../apiHistory";

const useDeleteHistoryItem = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteItem, isPending: isDeleting } = useMutation({
    mutationFn: deleteHistoryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["historyItems"] });
    },
  });

  return { deleteItem, isDeleting };
};

export default useDeleteHistoryItem;
