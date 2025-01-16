import React from "react";
import styled from "styled-components";

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
  cursor: pointer;

  &:hover {
    background-color: #e9ecef;
  }
`;

interface GroceryListCardProps {
  groceryLists: { id: number; grocery_list_name: string }[]; // Define the expected structure
  onCardClick: (id: number) => void; // Function to handle card click
}

const GroceryListCard: React.FC<GroceryListCardProps> = ({ groceryLists, onCardClick }) => {
  return (
    <Wrapper>
      {groceryLists?.map((groceryList) => (
        <Card key={groceryList.id} onClick={() => onCardClick(groceryList.id)}>
          {groceryList.grocery_list_name}
        </Card>
      ))}
    </Wrapper>
  );
};

export default GroceryListCard;
