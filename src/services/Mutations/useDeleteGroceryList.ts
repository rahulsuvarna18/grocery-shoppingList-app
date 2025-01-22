import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroceryList } from "../apiUpdateGroceryList";

const useDeleteGroceryList = () => {
  const queryClient = useQueryClient();

  const { 
    mutate: deleteList,
    isPending: isDeleting,
    error 
  } = useMutation({
    mutationFn: deleteGroceryList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groceryLists"],
      });
    },
  });

  return { deleteList, isDeleting, error };
};

export default useDeleteGroceryList; 