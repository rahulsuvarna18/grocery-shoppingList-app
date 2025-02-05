import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemsToInventory } from "../apiInventory";
import { Database } from "../../types/database.types";

type InventoryItem = Database["public"]["Tables"]["inventory_items"]["Row"];

const useAddToInventory = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addToInventory,
    isPending: isAdding,
    error,
  } = useMutation<InventoryItem[], Error, { name: string; quantity: number; unit?: string }[]>({
    mutationFn: (items) => addItemsToInventory(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });

  return { addToInventory, isAdding, error };
};

export default useAddToInventory;
