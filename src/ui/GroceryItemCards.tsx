import React from "react";
import styled from "styled-components";
import useUpdateRecentlyDeleted from "../services/Mutations/useUpdateRecentlyDeletedItems";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start; /* Ensures items align to the left */
  align-items: flex-start; /* Keeps items aligned at the top */
`;

const GradientButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(45deg, #ff6f61, #ff9671);
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const EmptyMessage = styled.div`
  font-size: 16px;
  color: #888;
  text-align: center;
  margin-top: 20px;
`;

interface GroceryItemCardsProps {
  groceryLists: string[];
  id: number; // ID of the grocery list for mutation
}

const GroceryItemCards: React.FC<GroceryItemCardsProps> = ({ groceryLists, id }) => {
  const { updateRecentlyDeleted, isUpdating } = useUpdateRecentlyDeleted();

  // Filter out empty strings from the grocery list
  const filteredGroceryLists = groceryLists.filter((item) => item.trim() !== "");

  const handleDelete = (item: string) => {
    updateRecentlyDeleted({ id, itemToRemove: item });
  };

  return (
    <>
      {filteredGroceryLists.length > 0 ? (
        <Wrapper>
          {filteredGroceryLists.map((groceryList) => (
            <GradientButton key={groceryList} onClick={() => handleDelete(groceryList)} disabled={isUpdating}>
              {groceryList}
            </GradientButton>
          ))}
        </Wrapper>
      ) : (
        <EmptyMessage>Your Shopping List is empty</EmptyMessage>
      )}
    </>
  );
};

export default GroceryItemCards;
