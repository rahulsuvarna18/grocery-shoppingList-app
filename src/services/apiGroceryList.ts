import supabase from "./supabase";

export const getGroceryLists = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("Grocery List")
    .select("*")
    .eq('user_id', user.id);

  if (error) {
    console.error("Could not load the grocery list:", error);
    throw new Error("Grocery list could not be loaded");
  }

  return data;
};
