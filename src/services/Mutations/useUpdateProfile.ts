import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../apiProfile";
import supabase from "../supabase";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: async (updates: { fullName?: string; email?: string; avatarUrl?: string }) => {
      const result = await updateUserProfile(updates);
      // Force a session refresh to get the latest metadata
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.refreshSession();
      if (sessionError) throw sessionError;

      // Update the auth store with the new session
      if (session) {
        await supabase.auth.setSession(session);
      } else {
        console.error("Session is null, cannot update auth store.");
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { updateProfile, isUpdating };
};

export default useUpdateProfile;
