import supabase from "./supabase";
import { Database } from "../types/Supabase";

type UserMetadata = Database["public"]["Tables"]["user_metadata"]["Row"];

export const createInitialUserMetadata = async (user: any) => {
  const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;
  const transformedAvatarUrl = avatarUrl ? `${avatarUrl}?width=200&height=200&resize=cover` : null;

  const { data, error } = await supabase
    .from("user_metadata")
    .insert({
      user_id: user.id,
      full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
      avatar_url: transformedAvatarUrl,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      auth_provider: user.app_metadata?.provider || "email",
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating user metadata:", error);
    throw error;
  }

  return data;
};

export const getUserMetadata = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  // Try to get existing metadata
  const { data, error } = await supabase.from("user_metadata").select("*").eq("user_id", user.id).single();

  if (error) {
    if (error.code === "PGRST116") {
      // No rows returned error
      // Create initial metadata if it doesn't exist
      console.log("Creating initial user metadata for new user");
      return await createInitialUserMetadata(user);
    }
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
