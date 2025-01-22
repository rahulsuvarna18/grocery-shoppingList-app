import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroceryItems } from "../apiUpdateGroceryList";

const useRestoreGroceryItem = () => {
  const queryClient = useQueryClient();

  const { mutate: restoreGroceryItem, isPending: isRestoring } = useMutation({
    mutationFn: updateGroceryItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groceryLists"] });
    },
  });

  return { restoreGroceryItem, isRestoring };
};

export default useRestoreGroceryItem; 