import supabase from "./supabase";
import { Database } from "../types/database.types";

type UserGroceryItemHistory = Database["public"]["Tables"]["user_grocery_item_history"]["Row"];

export const addToHistory = async (item: Database["public"]["Tables"]["user_grocery_items"]["Row"]): Promise<void> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase.from("user_grocery_item_history").insert([
    {
      user_grocery_item_id: item.id,
      user_id: user.id,
      grocery_list_id: item.grocery_list_id,
      grocery_item_id: item.grocery_item_id,
      name: item.name,
      category_id: item.category_id,
      item_details: item.item_details,
      description: item.description,
      is_custom: item.is_custom,
      bought_at: new Date().toISOString(),
      is_deleted: true,
      deleted_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Error adding item to history:", error);
    throw new Error("Item could not be added to history");
  }
};

export const getHistoryItems = async (): Promise<UserGroceryItemHistory[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase.from("user_grocery_item_history").select("*").eq("user_id", user.id).order("deleted_at", { ascending: false });

  if (error) {
    console.error("Error fetching history items:", error);
    throw new Error("History items could not be loaded");
  }

  return data;
};
