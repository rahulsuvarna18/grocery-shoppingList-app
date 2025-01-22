import { useQuery } from "@tanstack/react-query";
import { getGroceryLists } from "../services/apiGroceryList";
import LoadingSpinner from "../ui/LoadingSpinner";
import Error from "../ui/Error";
import styled from "styled-components";

import GroceryListCard from "../ui/GroceryListCards";
import CreateGroceryList from "./CreateGroceryList";

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  background: #f8f9fa;
  border-radius: 12px;
  margin-top: 2rem;
  width: 100%;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const EmptyStateText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const GroceryLists = () => {
  const {
    isPending,
    data: groceryLists,
    error,
  } = useQuery({
    queryKey: ["groceryLists"],
    queryFn: getGroceryLists,
  });

  if (isPending) return <LoadingSpinner />;
  if (error) return <Error message={error.message} />;

  return (
    <>
      <ButtonContainer>
        <CreateGroceryList />
      </ButtonContainer>
      {groceryLists && groceryLists.length > 0 ? (
        <GroceryListCard groceryLists={groceryLists} />
      ) : (
        <EmptyState>
          <EmptyStateTitle>No Shopping Lists Yet</EmptyStateTitle>
          <EmptyStateText>
            Create your first shopping list above to get started with organizing your groceries.
          </EmptyStateText>
        </EmptyState>
      )}
    </>
  );
};
