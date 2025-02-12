import { Database } from "./database.types";

export type HistoryItem = Database["public"]["Tables"]["user_grocery_item_history"]["Row"];
export type GroceryList = Database["public"]["Tables"]["grocery_lists"]["Row"];

export interface HistoryCardProps {
  item: HistoryItem;
  onDelete: (id: number) => void;
  itemName: string;
  listName: string;
}
