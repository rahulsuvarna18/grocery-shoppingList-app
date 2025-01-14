import supabase from "./supabase";

export const getGroceryLists = async () => {
  const { data, error } = await supabase.from("Grocery List").select("*");

  if (error) {
    console.log("Could not load the grocery list");
    throw new Error("Grocery list could not be loaded");
  }

  return data;
};
