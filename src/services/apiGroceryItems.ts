import supabase from "./supabase";
import { Database } from "../types/database.types";

type GroceryItem = Database["public"]["Tables"]["grocery_items"]["Row"];

export const getGroceryItems = async (): Promise<GroceryItem[]> => {
  const { data, error } = await supabase.from("grocery_items").select("*");

  if (error) {
    console.error("Error fetching grocery items:", error);
    throw new Error("Grocery items could not be loaded");
  }

  return data;
};

export const getGroceryItemsByCategory = async (categoryId: number): Promise<GroceryItem[]> => {
  const { data, error } = await supabase.from("grocery_items").select("*").eq("category_id", categoryId);

  if (error) {
    console.error("Error fetching grocery items:", error);
    throw new Error("Grocery items could not be loaded");
  }

  return data;
};

export const getGroceryItemById = async (id: number): Promise<GroceryItem> => {
  const { data, error } = await supabase.from("grocery_items").select("*").eq("id", id).single();

  if (error) {
    console.error("Error fetching grocery item:", error);
    throw new Error("Grocery item could not be loaded");
  }

  return data;
};

export const searchGroceryItems = async (query: string): Promise<GroceryItem[]> => {
  const { data, error } = await supabase.from("grocery_items").select("*").ilike("name", `${query}%`).order("name").limit(10);

  if (error) {
    console.error("Error searching grocery items:", error);
    throw new Error("Grocery items could not be searched");
  }

  return data;
};
