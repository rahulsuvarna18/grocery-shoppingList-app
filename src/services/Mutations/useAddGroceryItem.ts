import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemToGroceryList } from "../apiGroceryList";
import { Database } from "../../types/database.types";

type UserGroceryItem = Database["public"]["Tables"]["user_grocery_items"]["Row"];

interface AddGroceryItemParams {
  groceryListId: number;
  groceryItemId?: number;
  name?: string;
  categoryId?: number;
  description?: string;
  isCustom: boolean;
  is_bought?: boolean;
  quantity?: number;
}

const useAddGroceryItem = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addGroceryItem,
    isPending: isAdding,
    error,
  } = useMutation<UserGroceryItem, Error, AddGroceryItemParams>({
    mutationFn: (params) => addItemToGroceryList(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["groceryListItems", variables.groceryListId] });
    },
  });

  return { addGroceryItem, isAdding, error };
};

export default useAddGroceryItem;
