import supabase from "./supabase";
import { Database } from "../types/database.types";

type GroceryList = Database["public"]["Tables"]["grocery_lists"]["Row"];
type UserGroceryItem = Database["public"]["Tables"]["user_grocery_items"]["Row"];

interface CreateGroceryListProps {
  name: string;
  color: string;
}

interface AddGroceryItemProps {
  groceryListId: number;
  groceryItemId?: number;
  name?: string;
  categoryId?: number;
  description?: string;
  isCustom: boolean;
  is_bought?: boolean;
}

export const getGroceryLists = async (): Promise<GroceryList[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase.from("grocery_lists").select("*").eq("user_id", user.id);

  if (error) {
    console.error("Could not load the grocery lists:", error);
    throw new Error("Grocery lists could not be loaded");
  }

  return data;
};

export const getGroceryListItems = async (listId: number): Promise<UserGroceryItem[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase.from("user_grocery_items").select("*").eq("user_id", user.id).eq("grocery_list_id", listId);

  if (error) {
    console.error("Could not load the grocery list items:", error);
    throw new Error("Grocery list items could not be loaded");
  }

  return data;
};

export const createGroceryList = async ({ name, color }: CreateGroceryListProps): Promise<GroceryList> => {
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
        user_id: user.id,
        color: color,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating grocery list:", error);
    throw new Error("Grocery list could not be created");
  }

  return data;
};

export const addItemToGroceryList = async ({ groceryListId, groceryItemId, name, categoryId, description, isCustom, is_bought }: AddGroceryItemProps): Promise<UserGroceryItem> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("user_grocery_items")
    .insert([
      {
        user_id: user.id,
        grocery_list_id: groceryListId,
        grocery_item_id: groceryItemId,
        name,
        category_id: categoryId,
        description,
        is_custom: isCustom,
        is_bought: is_bought || false,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error adding item to grocery list:", error);
    throw new Error("Item could not be added to grocery list");
  }

  return data;
};

export const updateGroceryItemStatus = async (itemId: number, isBought: boolean): Promise<void> => {
  const { error } = await supabase
    .from("user_grocery_items")
    .update({
      is_bought: isBought,
      bought_at: isBought ? new Date().toISOString() : null,
    })
    .eq("id", itemId);

  if (error) {
    console.error("Error updating item status:", error);
    throw new Error("Item status could not be updated");
  }
};

export const updateGroceryItemDescription = async (itemId: number, description: string): Promise<void> => {
  // First, get the current description
  const { data: currentItem, error: fetchError } = await supabase.from("user_grocery_items").select("description").eq("id", itemId).single();

  if (fetchError) {
    console.error("Error fetching current item description:", fetchError);
    throw new Error("Could not fetch current item description");
  }

  // Append the new description to the existing one
  const currentDescription = currentItem?.description || "";
  const newDescription = currentDescription ? `${currentDescription}, ${description}` : description;

  // Update with the combined description
  const { error: updateError } = await supabase
    .from("user_grocery_items")
    .update({
      description: newDescription,
    })
    .eq("id", itemId);

  if (updateError) {
    console.error("Error updating item description:", updateError);
    throw new Error("Item description could not be updated");
  }
};

export const deleteGroceryList = async (id: number): Promise<void> => {
  const { error } = await supabase.from("grocery_lists").delete().eq("id", id);

  if (error) {
    console.error("Error deleting grocery list:", error);
    throw new Error("Grocery list could not be deleted");
  }
};

export const removeItemFromGroceryList = async (itemId: number): Promise<void> => {
  const { error } = await supabase.from("user_grocery_items").delete().eq("id", itemId);

  if (error) {
    console.error("Error removing item from grocery list:", error);
    throw new Error("Item could not be removed from grocery list");
  }
};
