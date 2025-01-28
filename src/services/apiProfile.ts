import supabase from "./supabase";
import { Database } from "../types/Supabase";

type UserMetadata = Database["public"]["Tables"]["user_metadata"]["Row"];

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

export const uploadAvatar = async (file: File) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const fileExt = file.name.split(".").pop();
    const fileName = `avatar.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    // Upload file to avatars bucket
    const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, {
      upsert: true,
      contentType: file.type,
    });

    if (uploadError) throw uploadError;

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    // Transform URL to use transformed image
    const transformedUrl = `${publicUrl}?width=200&height=200&resize=cover`;

    return transformedUrl;
  } catch (error) {
    console.error("Avatar upload failed:", error);
    throw error;
  }
};
