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
  recently_used: string;
}

export const updateGroceryItems = async ({ id, newItem }: UpdateGroceryItemsProps): Promise<GroceryList[]> => {
  // Fetch the current value of the grocery_items column
  const { data: allExistingData, error: fetchError } = await supabase.from("Grocery List").select("grocery_items").eq("id", id).single();

  console.log(allExistingData, "existing items");

  if (fetchError) {
    console.error("Error fetching grocery list:", fetchError.message);
    throw new Error(fetchError.message);
  }

  const existingGroceryItems = allExistingData?.grocery_items || "";
  const updatedItems = existingGroceryItems
    ? `${existingGroceryItems},${newItem}` // Append the new item to the existing list
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

export const updateRecentlyDeletedItems = async ({ id, itemToRemove }: { id: number; itemToRemove: string }): Promise<void> => {
  // Fetch the current data
  const { data: groceryListData, error: fetchError } = await supabase.from("Grocery List").select("grocery_items, recently_used").eq("id", id).single();

  if (fetchError) {
    console.error("Error fetching grocery list:", fetchError.message);
    throw new Error(fetchError.message);
  }

  // Destructure and manage existing data
  const { grocery_items, recently_used } = groceryListData || {};
  const updatedGroceryItems = grocery_items
    .split(",")
    .filter((item: string) => item.trim() !== itemToRemove)
    .join(",");
  const updatedRecentlyDeletedItems = recently_used
    ? `${recently_used},${itemToRemove}` // Append the item to recently_deleted
    : itemToRemove;

  // Update the database with modified data
  const { error: updateError } = await supabase
    .from("Grocery List")
    .update({
      grocery_items: updatedGroceryItems,
      recently_used: updatedRecentlyDeletedItems,
    })
    .eq("id", id);

  if (updateError) {
    console.error("Error updating grocery list:", updateError.message);
    throw new Error(updateError.message);
  }
};
