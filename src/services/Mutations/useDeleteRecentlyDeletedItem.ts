import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecentlyDeletedItem as deleteRecentlyDeletedItemApi } from "../apiUpdateGroceryList";

const useDeleteRecentlyDeletedItem = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteRecentlyDeletedItem, isPending: isDeleting } = useMutation({
    mutationFn: deleteRecentlyDeletedItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groceryLists"],
      });
    },
  });

  return { deleteRecentlyDeletedItem, isDeleting };
};

export default useDeleteRecentlyDeletedItem;
