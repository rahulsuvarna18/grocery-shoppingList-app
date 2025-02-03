import { useQuery } from "@tanstack/react-query";
import { searchGroceryItems } from "../apiGroceryItems";

const useSearchGroceryItems = (query: string) => {
  const {
    data: searchResults,
    isPending: isSearching,
    error,
  } = useQuery({
    queryKey: ["groceryItemSearch", query],
    queryFn: () => searchGroceryItems(query),
    enabled: query.length > 0,
  });

  return { searchResults, isSearching, error };
};

export default useSearchGroceryItems;
