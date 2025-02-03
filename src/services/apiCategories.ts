import supabase from "./supabase";
import { Database } from "../types/database.types";

type Category = Database["public"]["Tables"]["categories"]["Row"];

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Categories could not be loaded");
  }

  return data;
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const { data, error } = await supabase.from("categories").select("*").eq("id", id).single();

  if (error) {
    console.error("Error fetching category:", error);
    throw new Error("Category could not be loaded");
  }

  return data;
};
