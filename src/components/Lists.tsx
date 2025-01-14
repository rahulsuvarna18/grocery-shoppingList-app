import { useQuery } from "@tanstack/react-query";
import { getGroceryLists } from "../services/apiGroceryList";
import LoadingSpinner from "../ui/LoadingSpinner";
import Error from "../ui/Error";
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

export const Lists = () => {
  const {
    isLoading,
    data: groceryLists,
    error,
  } = useQuery({
    queryKey: ["groceryLists"],
    queryFn: getGroceryLists,
  });

  console.log(groceryLists);

  if (isLoading) return <LoadingSpinner />;

  if (error) return <Error message={error.message} />;

  return <Wrapper>{groceryLists?.map((groceryList) => groceryList.grocery_items.split(",").map((item: string, index: number) => <Card key={`${groceryList.id}-${index}`}>{item.trim()}</Card>))}</Wrapper>;
};
