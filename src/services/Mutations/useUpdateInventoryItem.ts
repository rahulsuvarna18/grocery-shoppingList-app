import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInventoryItem } from "../apiInventory";
import { Database } from "../../types/database.types";

type UpdateInventoryItem = Omit<Database['public']['Tables']['inventory_items']['Update'], 'user_id'>;

const useUpdateInventoryItem = () => {
  const queryClient = useQueryClient();

  const { mutate: updateItem, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateInventoryItem }) => 
      updateInventoryItem(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });

  return { updateItem, isUpdating };
};

export default useUpdateInventoryItem; 