import { useQuery, useQueries } from "@tanstack/react-query";
import styled from "styled-components";
import { getHistoryItems } from "../services/apiHistory";
import { format } from "date-fns";
import { History as HistoryIcon } from "lucide-react";
import EmptyState from "../components/EmptyState/EmptyState";
import { getGroceryItemById } from "../services/apiGroceryItems";
import { Database } from "../types/database.types";

// type GroceryItem = Database["public"]["Tables"]["grocery_items"]["Row"];
type HistoryItem = Database["public"]["Tables"]["user_grocery_item_history"]["Row"];

const History = () => {
  const { data: historyItems, isLoading } = useQuery<HistoryItem[]>({
    queryKey: ["historyItems"],
    queryFn: getHistoryItems,
  });

  // Fetch grocery item names for non-custom items
  const groceryItemsResults = useQueries({
    queries: (historyItems?.filter((item) => item.grocery_item_id !== null) || []).map((item) => ({
      queryKey: ["groceryItem", item.grocery_item_id] as const,
      queryFn: () => getGroceryItemById(item.grocery_item_id!),
      enabled: !!item.grocery_item_id,
    })),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!historyItems || historyItems.length === 0) {
    return <EmptyState icon={<HistoryIcon size={32} />} title="No History Yet" text="Items you delete from your grocery lists will appear here for future reference and analysis." />;
  }

  const getItemName = (item: HistoryItem) => {
    if (!item.grocery_item_id) return item.name || "Unnamed Item";

    const groceryItem = groceryItemsResults.find((result) => result.data?.id === item.grocery_item_id)?.data;

    return groceryItem?.name || item.name || "Unnamed Item";
  };

  return (
    <Wrapper>
      <Title>Shopping History</Title>
      <Description>View your past grocery items and shopping patterns</Description>

      <HistoryList>
        {historyItems.map((item) => (
          <HistoryCard key={item.id}>
            <ItemHeader>
              <ItemName>{getItemName(item)}</ItemName>
              <DeletedDate>{item.deleted_at ? format(new Date(item.deleted_at), "MMM d, yyyy") : "Unknown date"}</DeletedDate>
            </ItemHeader>
            {item.description && <ItemDescription>{item.description}</ItemDescription>}
            <ItemDetails>
              <DetailItem>List ID: {item.grocery_list_id}</DetailItem>
              {item.is_custom && <DetailItem>Custom Item</DetailItem>}
              <DetailItem>Status: {item.is_deleted ? "Deleted" : "Active"}</DetailItem>
            </ItemDetails>
          </HistoryCard>
        ))}
      </HistoryList>
    </Wrapper>
  );
};

export default History;

const Wrapper = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
`;

const HistoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

const HistoryCard = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const ItemName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
`;

const DeletedDate = styled.span`
  font-size: 12px;
  color: #666;
`;

const ItemDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 8px 0;
  font-style: italic;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const DetailItem = styled.span`
  font-size: 12px;
  color: #666;
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
`;
