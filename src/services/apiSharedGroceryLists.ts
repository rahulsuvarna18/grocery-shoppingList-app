import supabase from "./supabase";
import { Database } from "../types/database.types";

type SharedGroceryList = Database["public"]["Tables"]["shared_grocery_lists"]["Row"];
type GroceryList = Database["public"]["Tables"]["grocery_lists"]["Row"];

export const getSharedGroceryLists = async (): Promise<SharedGroceryList[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase.from("shared_grocery_lists").select("*").eq("shared_with_user_id", user.id);

  if (error) {
    console.error("Error fetching shared grocery lists:", error);
    throw new Error("Shared grocery lists could not be loaded");
  }

  return data;
};

export const getSharedGroceryListDetails = async (): Promise<GroceryList[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("shared_grocery_lists")
    .select(
      `
      grocery_lists (*)
    `
    )
    .eq("shared_with_user_id", user.id);

  if (error) {
    console.error("Error fetching shared grocery list details:", error);
    throw new Error("Shared grocery list details could not be loaded");
  }

  return data.map((item: any) => item.grocery_lists);
};

export const shareGroceryList = async (groceryListId: number, sharedWithUserId: string): Promise<void> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase.from("shared_grocery_lists").insert([
    {
      owner_user_id: user.id,
      shared_with_user_id: sharedWithUserId,
      grocery_list_id: groceryListId,
    },
  ]);

  if (error) {
    console.error("Error sharing grocery list:", error);
    throw new Error("Grocery list could not be shared");
  }
};

export const removeSharedGroceryList = async (sharedListId: number): Promise<void> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase.from("shared_grocery_lists").delete().eq("id", sharedListId).eq("owner_user_id", user.id);

  if (error) {
    console.error("Error removing shared grocery list:", error);
    throw new Error("Shared grocery list could not be removed");
  }
};
