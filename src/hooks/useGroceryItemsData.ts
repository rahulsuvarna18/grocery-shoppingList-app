import { useCallback } from "react";
import { useQueries } from "@tanstack/react-query";
import { getGroceryItemById } from "../services/apiGroceryItems";
import { HistoryItem } from "../types/history.types";

export function useGroceryItemsData(historyItems: HistoryItem[] | undefined) {
  // Optimized grocery items query with proper caching
  const groceryItemsResults = useQueries({
    queries: (historyItems?.filter((item) => item.grocery_item_id !== null) || []).map((item) => ({
      queryKey: ["groceryItem", item.grocery_item_id] as const,
      queryFn: () => getGroceryItemById(item.grocery_item_id!),
      enabled: !!item.grocery_item_id,
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    })),
  });

  // Memoized utility function to get item name
  const getItemName = useCallback(
    (item: HistoryItem) => {
      if (!item.grocery_item_id) return item.name || "Unnamed Item";
      const groceryItem = groceryItemsResults.find((result) => result.data?.id === item.grocery_item_id)?.data;
      return groceryItem?.name || item.name || "Unnamed Item";
    },
    [groceryItemsResults]
  );

  return {
    groceryItemsResults,
    getItemName,
  };
}
