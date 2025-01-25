import supabase from "./supabase";
import { Database } from "../types/Supabase";

type UserMetadata = Database["public"]["Tables"]["user_metadata"]["Row"];

export const getUserMetadata = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase.from("user_metadata").select("*").eq("user_id", user.id).single();

  if (error) {
    console.error("Error fetching user metadata:", error);
    throw error;
  }

  return data as UserMetadata;
};

export const updateUserMetadata = async (updates: { full_name?: string | null; avatar_url?: string | null }) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("user_metadata")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating user metadata:", error);
    throw error;
  }

  return data as UserMetadata;
};
