import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getGroceryLists, getGroceryListItems } from "../services/apiGroceryList";
import Input from "../ui/Input";
import GroceryItemCards from "../ui/GroceryItemCards";
import LoadingSpinner from "../ui/LoadingSpinner";
import Error from "../ui/Error";
import { ArrowLeft } from "lucide-react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  align-items: center;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  padding-bottom: 0;
  width: 100%;
  max-width: 1200px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-top: -8px;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: white;
  color: #43a047;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  width: 100%;
`;

const GroceryList = () => {
  const { listName } = useParams();
  const navigate = useNavigate();

  // Query to get all grocery lists
  const {
    data: groceryLists,
    isPending: isListsPending,
    error: listsError,
  } = useQuery({
    queryKey: ["groceryLists"],
    queryFn: getGroceryLists,
  });

  // Convert URL format back to potential list name format
  const urlToListName = (urlName: string) => {
    return urlName
      .split("-")
      .map((word) => word.trim())
      .join(" ");
  };

  const decodedListName = urlToListName(listName || "");
  const selectedList = groceryLists?.find((list) => list.grocery_list_name.toLowerCase() === decodedListName.toLowerCase());

  // Query to get items for the selected list
  const {
    data: groceryItems,
    isPending: isItemsPending,
    error: itemsError,
  } = useQuery({
    queryKey: ["groceryListItems", selectedList?.id],
    queryFn: () => (selectedList ? getGroceryListItems(selectedList.id) : Promise.resolve([])),
    enabled: !!selectedList,
  });

  if (isListsPending || isItemsPending) return <LoadingSpinner />;
  if (listsError) return <Error message={listsError.message} />;
  if (itemsError) return <Error message={itemsError.message} />;

  if (!selectedList) {
    return <Error message="List not found" />;
  }

  return (
    <Wrapper>
      <TopBar>
        <BackButton onClick={() => navigate("/home")}>
          <ArrowLeft size={18} />
          Back to Lists
        </BackButton>
      </TopBar>
      <ContentContainer>
        <Input selectedListId={selectedList.id} />
        <ItemsWrapper>
          <GroceryItemCards id={selectedList.id} groceryItems={groceryItems || []} />
        </ItemsWrapper>
      </ContentContainer>
    </Wrapper>
  );
};

export default GroceryList;
