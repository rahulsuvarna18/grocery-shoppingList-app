import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getGroceryLists, getGroceryListItems } from "../services/apiGroceryList";
import LoadingSpinner from "../ui/LoadingSpinner";
import Error from "../ui/Error";
import styled from "styled-components";
import Input from "../ui/Input";
// import RecentlyDeleted from "./RecentlyDeleted";
import GroceryItemCards from "../ui/GroceryItemCards";
import { Database } from "../types/database.types";

type GroceryList = Database["public"]["Tables"]["grocery_lists"]["Row"];
type UserGroceryItem = Database["public"]["Tables"]["user_grocery_items"]["Row"];

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

const ItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allows wrapping of grocery item cards */
  gap: 10px;
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

// Custom hook to manage grocery list state and data fetching
const useGroceryListOperations = () => {
  const [selectedList, setSelectedList] = useState<number | null>(null);

  const {
    isPending,
    data: groceryLists,
    error,
  } = useQuery<GroceryList[]>({
    queryKey: ["groceryLists"],
    queryFn: getGroceryLists,
  });

  const { data: groceryItems = [] } = useQuery<UserGroceryItem[]>({
    queryKey: ["groceryListItems", selectedList],
    queryFn: () => (selectedList ? getGroceryListItems(selectedList) : Promise.resolve([])),
    enabled: selectedList !== null,
  });

  return {
    selectedList,
    setSelectedList,
    isPending,
    error,
    groceryLists,
    groceryItems,
  };
};

// Render prop component for grocery items view
const GroceryItemsView = ({ selectedList, groceryItems, onBack }: { selectedList: number; groceryItems: UserGroceryItem[]; onBack: () => void }) => (
  <Wrapper>
    <Input selectedListId={selectedList} />
    <ItemsWrapper>
      <GroceryItemCards groceryItems={groceryItems} id={selectedList} />
    </ItemsWrapper>
    <ButtonWrapper>
      <BackButton onClick={onBack}>Back to List</BackButton>
    </ButtonWrapper>
  </Wrapper>
);

// Render prop component for grocery lists view
const GroceryListsView = ({ groceryLists, onSelectList }: { groceryLists: GroceryList[]; onSelectList: (id: number) => void }) => (
  <Wrapper>
    {groceryLists?.map((groceryList) => (
      <Card key={groceryList.id} onClick={() => onSelectList(groceryList.id)}>
        {groceryList.grocery_list_name}
      </Card>
    ))}
  </Wrapper>
);

export const Lists = () => {
  const { selectedList, setSelectedList, isPending, error, groceryLists, groceryItems } = useGroceryListOperations();

  if (isPending) return <LoadingSpinner />;
  if (error) return <Error message={error.message} />;

  return selectedList !== null ? <GroceryItemsView selectedList={selectedList} groceryItems={groceryItems} onBack={() => setSelectedList(null)} /> : <GroceryListsView groceryLists={groceryLists || []} onSelectList={setSelectedList} />;
};
