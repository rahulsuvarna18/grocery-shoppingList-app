import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserMetadata, updateUserMetadata } from "../services/apiUserMetadata";
import { useAuth } from "../context/AuthContext";

export const useUserMetadata = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: userMetadata,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userMetadata", user?.id],
    queryFn: getUserMetadata,
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    // cacheTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
  });

  const { mutate: updateMetadata, isPending: isUpdating } = useMutation({
    mutationFn: updateUserMetadata,
    onSuccess: (newData) => {
      queryClient.setQueryData(["userMetadata", user?.id], newData);
    },
  });

  return {
    userMetadata,
    isLoading,
    error,
    updateMetadata,
    isUpdating,
  };
};
