import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInventoryItem } from "../apiInventory";
import { Database } from "../../types/database.types";

type InsertInventoryItem = Omit<Database['public']['Tables']['inventory_items']['Insert'], 'user_id'>;

const useCreateInventoryItem = () => {
  const queryClient = useQueryClient();

  const { mutate: createItem, isPending: isCreating } = useMutation({
    mutationFn: (item: InsertInventoryItem) => createInventoryItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });

  return { createItem, isCreating };
};

export default useCreateInventoryItem; 