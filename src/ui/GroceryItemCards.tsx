import React from "react";
import styled from "styled-components";
import useUpdateRecentlyDeleted from "../services/Mutations/useUpdateRecentlyDeletedItems";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Card = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 14px;
`;

interface GroceryItemCardsProps {
  groceryLists: string[];
  id: number; // ID of the grocery list for mutation
}

const GroceryItemCards: React.FC<GroceryItemCardsProps> = ({ groceryLists, id }) => {
  const { updateRecentlyDeleted, isUpdating } = useUpdateRecentlyDeleted();

  const handleDelete = (item: string) => {
    updateRecentlyDeleted({ id, itemToRemove: item });
  };

  return (
    <Wrapper>
      {groceryLists?.map((groceryList) => (
        <Card key={groceryList} onClick={() => handleDelete(groceryList)}>
          {groceryList} {isUpdating && "(Updating...)"}{" "}
        </Card>
      ))}
    </Wrapper>
  );
};

export default GroceryItemCards;
