import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getGroceryLists } from '../services/apiGroceryList';
import Input from '../ui/Input';
import GroceryItemCards from '../ui/GroceryItemCards';
import RecentlyDeleted from '../components/RecentlyDeleted';
import LoadingSpinner from '../ui/LoadingSpinner';
import Error from '../ui/Error';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: left;
  width: 100%;
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
  }
`;

const GroceryList = () => {
  const { listName } = useParams();
  const navigate = useNavigate();
  
  const { data: groceryLists, isPending, error } = useQuery({
    queryKey: ['groceryLists'],
    queryFn: getGroceryLists,
  });

  if (isPending) return <LoadingSpinner />;
  if (error) return <Error message={error.message} />;

  // Convert URL format back to potential list name format
  const urlToListName = (urlName: string) => {
    return urlName
      .split('-')
      .map(word => word.trim())
      .join(' ');
  };

  const decodedListName = urlToListName(listName || '');

  const selectedList = groceryLists?.find(
    list => list.grocery_list_name.toLowerCase() === decodedListName.toLowerCase()
  );

  if (!selectedList) {
    return <Error message="List not found" />;
  }

  const groceryItems = selectedList.grocery_items.split(',') || [];
  const recentlyDeletedGroceryItems = selectedList.recently_used.split(',') || [];

  return (
    <Wrapper>
      <BackButton onClick={() => navigate('/home')}>
        Back to Lists
      </BackButton>
      <Input selectedListId={selectedList.id} />
      <ItemsWrapper>
        <GroceryItemCards 
          id={selectedList.id} 
          groceryLists={groceryItems} 
        />
      </ItemsWrapper>
      <ItemsWrapper>
        <RecentlyDeleted 
          id={selectedList.id} 
          recentlyDeletedItems={recentlyDeletedGroceryItems} 
        />
      </ItemsWrapper>
    </Wrapper>
  );
};

export default GroceryList; 