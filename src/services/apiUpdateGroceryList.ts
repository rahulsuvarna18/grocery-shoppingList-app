import supabase from "./supabase";

interface UpdateGroceryItemsProps {
  id: number;
  newItem: string;
}

interface GroceryList {
  id: number;
  grocery_list_items: string;
  created_at: string;
  grocery_list_name: string;
  recently_used: string;
}

interface CreateGroceryListProps {
  name: string;
  color: string;
}

export const updateGroceryItems = async ({ id, newItem }: UpdateGroceryItemsProps): Promise<GroceryList[]> => {
  // Fetch the current value of the grocery_list_items column
  const { data: allExistingData, error: fetchError } = await supabase.from("grocery_lists").select("grocery_list_items").eq("id", id).single();

  console.log(allExistingData, "existing items");

  if (fetchError) {
    console.error("Error fetching grocery list:", fetchError.message);
    throw new Error(fetchError.message);
  }

  const existingGroceryItems = allExistingData?.grocery_list_items || "";
  const updatedItems = existingGroceryItems ? `${existingGroceryItems},${newItem}` : newItem;

  // Update the grocery_list_items column
  const { data, error } = await supabase.from("grocery_lists").update({ grocery_list_items: updatedItems }).eq("id", id).select();

  if (error) {
    console.error("Error updating grocery list:", error.message);
    throw new Error(error.message);
  }

  console.log(data);

  return data;
};

export const updateRecentlyDeletedItems = async ({ id, itemToRemove }: { id: number; itemToRemove: string }): Promise<void> => {
  // Fetch the current data
  const { data: groceryListData, error: fetchError } = await supabase.from("grocery_lists").select("grocery_list_items, recently_used").eq("id", id).single();

  if (fetchError) {
    console.error("Error fetching grocery list:", fetchError.message);
    throw new Error(fetchError.message);
  }

  const { grocery_list_items, recently_used } = groceryListData || {};
  const updatedGroceryItems = grocery_list_items
    .split(",")
    .filter((item: string) => item.trim() !== itemToRemove)
    .join(",");
  const updatedRecentlyDeletedItems = recently_used ? `${recently_used},${itemToRemove}` : itemToRemove;

  const { error: updateError } = await supabase
    .from("grocery_lists")
    .update({
      grocery_list_items: updatedGroceryItems,
      recently_used: updatedRecentlyDeletedItems,
    })
    .eq("id", id);

  if (updateError) {
    console.error("Error updating grocery list:", updateError.message);
    throw new Error(updateError.message);
  }
};

export const deleteRecentlyDeletedItem = async ({ id, itemToRemove }: { id: number; itemToRemove: string }): Promise<void> => {
  // Fetch the current data
  const { data: groceryListData, error: fetchError } = await supabase.from("grocery_lists").select("recently_used").eq("id", id).single();

  if (fetchError) {
    console.error("Error fetching recently deleted list:", fetchError.message);
    throw new Error(fetchError.message);
  }

  const { recently_used } = groceryListData || {};

  // Remove the item from recently_used
  const updatedRecentlyDeletedItems = recently_used
    .split(",")
    .filter((item: string) => item.trim() !== itemToRemove)
    .join(",");

  // Update the database with modified data
  const { error: updateError } = await supabase
    .from("grocery_lists")
    .update({
      recently_used: updatedRecentlyDeletedItems,
    })
    .eq("id", id);

  if (updateError) {
    console.error("Error updating recently deleted list:", updateError.message);
    throw new Error(updateError.message);
  }
};

export const createGroceryList = async ({ name, color }: CreateGroceryListProps): Promise<GroceryList[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data: existingLists } = await supabase.from("grocery_lists").select("grocery_list_name").eq("user_id", user.id).ilike("grocery_list_name", name);

  if (existingLists && existingLists.length > 0) {
    throw new Error("A list with this name already exists. Please choose a different name.");
  }

  const { data, error } = await supabase
    .from("grocery_lists")
    .insert([
      {
        grocery_list_name: name,
        grocery_list_items: "",
        recently_used: "",
        user_id: user.id,
        color: color,
      },
    ])
    .select();

  if (error) {
    console.error("Error creating grocery list:", error.message);
    throw new Error(error.message);
  }

  return data;
};

export const deleteGroceryList = async (id: number): Promise<void> => {
  const { error } = await supabase.from("grocery_lists").delete().eq("id", id);

  if (error) {
    console.error("Error deleting grocery list:", error.message);
    throw new Error(error.message);
  }
};
