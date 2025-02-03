import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroceryItemDescription } from "../apiGroceryList";

interface UpdateDescriptionParams {
  itemId: number;
  description: string;
  groceryListId: number;
}

const useUpdateGroceryItemDescription = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateDescription,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: ({ itemId, description }: UpdateDescriptionParams) => updateGroceryItemDescription(itemId, description),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["groceryListItems", variables.groceryListId],
      });
    },
  });

  return { updateDescription, isUpdating, error };
};

export default useUpdateGroceryItemDescription;
