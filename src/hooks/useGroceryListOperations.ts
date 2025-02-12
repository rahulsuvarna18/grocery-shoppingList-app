import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGroceryLists } from "../services/apiGroceryList";
import { GroceryList } from "../types/history.types";
import useDeleteHistoryItem from "../services/Mutations/useDeleteHistoryItem";

export function useGroceryListOperations() {
  const { deleteItem } = useDeleteHistoryItem();

  const { data: groceryLists, isLoading: isListsLoading } = useQuery<GroceryList[]>({
    queryKey: ["groceryLists"],
    queryFn: getGroceryLists,
  });

  const getListName = useCallback(
    (listId: number) => {
      return groceryLists?.find((list) => list.id === listId)?.grocery_list_name || "Unknown List";
    },
    [groceryLists]
  );

  const handleDelete = useCallback(
    (itemId: number) => {
      deleteItem(itemId);
    },
    [deleteItem]
  );

  return {
    groceryLists,
    isListsLoading,
    getListName,
    handleDelete,
  };
}
