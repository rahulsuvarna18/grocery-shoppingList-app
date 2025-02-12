import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getGroceryLists } from "../services/apiGroceryList";
import LoadingSpinner from "../ui/LoadingSpinner";
import Error from "../ui/Error";
import styled from "styled-components";
import Input from "../ui/Input";
import RecentlyDeleted from "./RecentlyDeleted";
import GroceryItemCards from "../ui/GroceryItemCards";

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
    // const selectedGroceryList = groceryLists?.find((list) => list.id === selectedList);

    return (
      <Wrapper>
        <Input selectedListId={selectedList} />
        <ItemsWrapper>
          <GroceryItemCards id={selectedList} groceryItems={[]} />
        </ItemsWrapper>
        <ButtonWrapper>
          <BackButton onClick={() => setSelectedList(null)}>Back to List</BackButton>
        </ButtonWrapper>
      </Wrapper>
    );
  }

  // Show grocery list names
  return (
    <Wrapper>
      {groceryLists?.map((groceryList) => (
        <Card key={groceryList.id} onClick={() => setSelectedList(groceryList.id)}>
          {groceryList.grocery_list_name}
        </Card>
      ))}
    </Wrapper>
  );
};
