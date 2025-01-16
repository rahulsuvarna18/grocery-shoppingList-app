import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecentlyDeletedItems } from "../apiUpdateGroceryList";

const useUpdateRecentlyDeleted = () => {
  const queryClient = useQueryClient();

  const { mutate: updateRecentlyDeleted, isPending: isUpdating } = useMutation({
    mutationFn: updateRecentlyDeletedItems,
    onSuccess: () => {
      // Invalidate the `groceryLists` query to refresh data
      queryClient.invalidateQueries({ queryKey: ["groceryLists"] });
    },
  });

  return { updateRecentlyDeleted, isUpdating };
};

export default useUpdateRecentlyDeleted;
