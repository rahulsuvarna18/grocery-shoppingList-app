import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroceryItems as updateGroceryItemsApi } from "../apiUpdateGroceryList";

const useUpdateGroceryItems = () => {
  const queryClient = useQueryClient();

  const { mutate: updateGroceryItems, isPending: isUpdating } = useMutation({
    mutationFn: updateGroceryItemsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groceryLists"],
      }); // Refresh data after update
    },
  });

  return { updateGroceryItems, isUpdating };
};

export default useUpdateGroceryItems;
