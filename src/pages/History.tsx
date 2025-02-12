import { memo } from "react";
import styled from "styled-components";
import { History as HistoryIcon } from "lucide-react";
import EmptyState from "../components/EmptyState/EmptyState";
import { useHistoryItems } from "../hooks/useHistory";
import LoadingSpinner from "../ui/LoadingSpinner";
import HistoryCard from "../components/HistoryCard/HistoryCard";
import { useGroceryItemsData } from "../hooks/useGroceryItemsData";
import { useGroceryListOperations } from "../hooks/useGroceryListOperations";

const History = () => {
  const { data: historyItems, isLoading: isHistoryLoading } = useHistoryItems();
  const { getItemName } = useGroceryItemsData(historyItems);
  const { isListsLoading, getListName, handleDelete } = useGroceryListOperations();

  if (isHistoryLoading || isListsLoading) {
    return <LoadingSpinner />;
  }

  if (!historyItems || historyItems.length === 0) {
    return <EmptyState icon={<HistoryIcon size={32} />} title="No History Yet" text="Items you delete from your grocery lists will appear here for future reference and analysis." />;
  }

  return (
    <Wrapper>
      <Title>Shopping History</Title>
      <Description>View your past grocery items and shopping patterns</Description>

      <HistoryList>
        {historyItems.map((item) => (
          <HistoryCard key={item.id} item={item} onDelete={handleDelete} itemName={getItemName(item)} listName={getListName(item.grocery_list_id)} />
        ))}
      </HistoryList>
    </Wrapper>
  );
};

export default memo(History);

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
