import supabase from "./supabase";

export const updateUserProfile = async (updates: { fullName?: string; email?: string; avatarUrl?: string }) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  // Prepare the metadata update
  const metadata = {
    ...user.user_metadata,
    full_name: updates.fullName || user.user_metadata?.full_name,
    avatar_url: updates.avatarUrl || user.user_metadata?.avatar_url,
  };

  const { data, error } = await supabase.auth.updateUser({
    data: metadata,
  });

  if (error) throw error;
  return data;
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
    const { error: uploadError, data } = await supabase.storage.from("avatars").upload(filePath, file, {
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
