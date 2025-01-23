import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInventoryItem } from "../apiInventory";

const useDeleteInventoryItem = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteItem, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteInventoryItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });

  return { deleteItem, isDeleting };
};

export default useDeleteInventoryItem; 