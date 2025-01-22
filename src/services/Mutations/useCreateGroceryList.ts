import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroceryList as createList } from "../apiUpdateGroceryList";

interface CreateGroceryListParams {
  name: string;
  color: string;
}

const useCreateGroceryList = () => {
  const queryClient = useQueryClient();

  const { mutate: createGroceryList, isPending: isCreating, error } = useMutation({
    mutationFn: (params: CreateGroceryListParams) => createList(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groceryLists"] });
    },
  });

  return { createGroceryList, isCreating, error };
};

export default useCreateGroceryList; 