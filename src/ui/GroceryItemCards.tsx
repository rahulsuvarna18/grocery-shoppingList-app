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
`;

interface GroceryItemCardsProps {
  groceryLists:
    | {
        id: number;
        grocery_items: string;
      }[]
    | undefined;
}

const GroceryItemCards: React.FC<GroceryItemCardsProps> = ({ groceryLists }) => {
  return <Wrapper>{groceryLists?.map((groceryList) => groceryList.grocery_items.split(",").map((item, index) => <Card key={`${groceryList.id}-${index}`}>{item.trim()}</Card>))}</Wrapper>;
};

export default GroceryItemCards;
