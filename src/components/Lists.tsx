import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getGroceryLists } from "../services/apiGroceryList";
import LoadingSpinner from "../ui/LoadingSpinner";
import Error from "../ui/Error";
import styled from "styled-components";
import Input from "../ui/Input";
import RecentlyDeleted from "./RecentlyDeleted";
import GroceryItemCards from "../ui/GroceryItemCards";
import GroceryListCard from "../ui/GroceryListCards";
import CreateGroceryList from "./CreateGroceryList";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allows wrapping of grocery item cards */
  gap: 10px; /* Adds space between items */
  justify-content: left; /* Centers items horizontally */

  width: 100%; /* Ensures it spans the full width of the parent */
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const BackButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
    transition: background-color 0.3s ease;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 4px #007bff;
  }
`;

export const Lists = () => {
  const {
    isPending,
    data: groceryLists,
    error,
  } = useQuery({
    queryKey: ["groceryLists"],
    queryFn: getGroceryLists,
  });

  const [selectedList, setSelectedList] = useState<number | null>(null);

  if (isPending) return <LoadingSpinner />;

  if (error) return <Error message={error.message} />;

  // If a list is selected, show grocery items
  if (selectedList !== null) {
    const selectedGroceryList = groceryLists?.find((list) => list.id === selectedList);
    const groceryItems = selectedGroceryList?.grocery_items.split(",") || [];
    const recentlyDeletedGroceryItems = selectedGroceryList?.recently_used.split(",") || [];

    return (
      <Wrapper>
        <Input selectedListId={selectedList} />
        <ItemsWrapper>
          <GroceryItemCards id={selectedList} groceryLists={groceryItems} />
        </ItemsWrapper>
        <ButtonWrapper>
          <BackButton onClick={() => setSelectedList(null)}>Back to List</BackButton>
        </ButtonWrapper>
        <ItemsWrapper>
          <RecentlyDeleted id={selectedList} recentlyDeletedItems={recentlyDeletedGroceryItems} />
        </ItemsWrapper>
      </Wrapper>
    );
  }

  // Show grocery list names and create form
  return (
    <Wrapper>
      <CreateGroceryList />
      <GroceryListCard groceryLists={groceryLists || []} onCardClick={(id) => setSelectedList(id)} />
    </Wrapper>
  );
};
