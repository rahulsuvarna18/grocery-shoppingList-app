import React from "react";
import styled from "styled-components";
import useUpdateRecentlyDeleted from "../services/Mutations/useUpdateRecentlyDeletedItems";
import { ShoppingBasket } from "lucide-react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  width: 100%;
  padding: 16px 0;
`;

const ItemCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  aspect-ratio: 1;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-color: #4caf50;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ItemInitial = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f0fdf4;
  color: #4caf50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const ItemName = styled.span`
  font-size: 14px;
  color: #333;
  text-align: center;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 48px 24px;
  background-color: #f8fafc;
  border-radius: 12px;
  width: 100%;
  text-align: center;
`;

const EmptyIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #f0fdf4;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4caf50;
  margin-bottom: 8px;
`;

const EmptyTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 0;
`;

const EmptyText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  max-width: 400px;
`;

interface GroceryItemCardsProps {
  groceryLists: string[];
  id: number;
}

const GroceryItemCards: React.FC<GroceryItemCardsProps> = ({ groceryLists, id }) => {
  const { updateRecentlyDeleted, isUpdating } = useUpdateRecentlyDeleted();
  const filteredGroceryLists = groceryLists.filter((item) => item.trim() !== "");

  const handleDelete = (item: string) => {
    updateRecentlyDeleted({ id, itemToRemove: item });
  };

  if (filteredGroceryLists.length === 0) {
    return (
      <EmptyState>
        <EmptyIcon>
          <ShoppingBasket size={32} />
        </EmptyIcon>
        <EmptyTitle>Your Shopping List is Empty</EmptyTitle>
        <EmptyText>
          Start adding items to your list using the input field above. 
          Each item you add will appear here as a card.
        </EmptyText>
      </EmptyState>
    );
  }

  return (
    <Wrapper>
      {filteredGroceryLists.map((item) => (
        <ItemCard 
          key={item} 
          onClick={() => handleDelete(item)} 
          disabled={isUpdating}
        >
          <ItemInitial>
            {item.charAt(0).toUpperCase()}
          </ItemInitial>
          <ItemName>{item}</ItemName>
        </ItemCard>
      ))}
    </Wrapper>
  );
};

export default GroceryItemCards;
