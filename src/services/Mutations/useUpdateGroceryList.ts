import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabase";

interface UpdateGroceryListParams {
  id: number;
  name: string;
  color: string;
}

const updateGroceryList = async ({ id, name, color }: UpdateGroceryListParams) => {
  const { data, error } = await supabase
    .from("Grocery List")
    .update({ 
      grocery_list_name: name,
      color: color || '#FFFFFF'
    })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

const useUpdateGroceryList = () => {
  const queryClient = useQueryClient();

  const { mutate: updateList, isPending: isUpdating, error } = useMutation({
    mutationFn: updateGroceryList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groceryLists"] });
    },
  });

  return { updateList, isUpdating, error };
};

export default useUpdateGroceryList; 