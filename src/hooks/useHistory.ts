import { useQuery } from "@tanstack/react-query";
import { getHistoryItems } from "../services/apiHistory";
import { Database } from "../types/database.types";

type HistoryItem = Database["public"]["Tables"]["user_grocery_item_history"]["Row"];

export const useHistoryItems = () => {
  return useQuery<HistoryItem[]>({
    queryKey: ["historyItems"],
    queryFn: getHistoryItems,
  });
};
