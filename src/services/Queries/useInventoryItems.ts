import { useQuery } from "@tanstack/react-query";
import { getInventoryItems } from "../apiInventory";

export const useInventoryItems = () => {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: getInventoryItems,
  });
}; 