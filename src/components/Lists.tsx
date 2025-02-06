import { useQuery } from "@tanstack/react-query";
import { getGroceryLists } from "../services/apiGroceryList";
import LoadingSpinner from "../ui/LoadingSpinner";
import Error from "../ui/Error";
import styled from "styled-components";
// import Input from "../ui/Input";
// import RecentlyDeleted from "./RecentlyDeleted";
// import GroceryItemCards from "../ui/GroceryItemCards";
import GroceryListCard from "../ui/GroceryListCards";
import CreateGroceryList from "./CreateGroceryList";

// const Wrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
// `;

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

// const ItemsWrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap; /* Allows wrapping of grocery item cards */
//   gap: 10px; /* Adds space between items */
//   justify-content: left; /* Centers items horizontally */

//   width: 100%; /* Ensures it spans the full width of the parent */
// `;

// const ButtonWrapper = styled.div`
//   width: 100%;
//   margin-top: 20px;
//   display: flex;
//   justify-content: center;
// `;

// const BackButton = styled.button`
//   padding: 10px 15px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   font-size: 16px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//     transition: background-color 0.3s ease;
//   }

//   &:focus {
//     outline: none;
//     box-shadow: 0 0 4px #007bff;
//   }
// `;

export const Lists = () => {
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
      <CreateGroceryList />
      {groceryLists && groceryLists.length > 0 ? (
        <GroceryListCard groceryLists={groceryLists} />
      ) : (
        <EmptyState>
          <EmptyStateTitle>No Shopping Lists Yet</EmptyStateTitle>
          <EmptyStateText>Create your first shopping list above to get started with organizing your groceries.</EmptyStateText>
        </EmptyState>
      )}
    </>
  );
};
