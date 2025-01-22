import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroceryList as createGroceryListApi } from "../apiUpdateGroceryList";

const useCreateGroceryList = () => {
  const queryClient = useQueryClient();

  const { mutate: createGroceryList, isPending: isCreating } = useMutation({
    mutationFn: createGroceryListApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groceryLists"],
      });
    },
  });

  return { createGroceryList, isCreating };
};

export default useCreateGroceryList; 