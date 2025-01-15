import { useQuery } from "@tanstack/react-query";
import { getGroceryLists } from "../apiGroceryList";

export const useGroceryLists = () => {
  const {
    isPending,
    data: groceryLists,
    error,
  } = useQuery({
    queryKey: ["groceryLists"],
    queryFn: getGroceryLists,
  });

  return { isPending, groceryLists, error };
};
