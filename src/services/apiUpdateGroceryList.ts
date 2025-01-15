import supabase from "./supabase";

interface UpdateGroceryItemsProps {
  id: number;
  newItem: string;
}

interface GroceryList {
  id: number;
  grocery_items: string;
  created_at: string;
  grocery_list_name: string;
}

export const updateGroceryItems = async ({ id, newItem }: UpdateGroceryItemsProps): Promise<GroceryList[]> => {
  // Fetch the current value of the grocery_items column
  const { data: existingData, error: fetchError } = await supabase.from("Grocery List").select("grocery_items").eq("id", id).single();

  if (fetchError) {
    console.error("Error fetching grocery list:", fetchError.message);
    throw new Error(fetchError.message);
  }

  const existingItems = existingData?.grocery_items || "";
  const updatedItems = existingItems
    ? `${existingItems},${newItem}` // Append the new item to the existing list
    : newItem; // Handle case where the list is empty

  // Update the grocery_items column
  const { data, error } = await supabase.from("Grocery List").update({ grocery_items: updatedItems }).eq("id", id).select();

  if (error) {
    console.error("Error updating grocery list:", error.message);
    throw new Error(error.message);
  }

  console.log(data);

  return data;
};
