import React from "react";
import styled from "styled-components";
import useDeleteRecentlyDeletedItem from "../services/Mutations/useDeleteRecentlyDeletedItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Add spacing between the title and the items */
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  display: block; /* Ensures it's in its own line */
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Card = styled.button`
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

const EmptyMessage = styled.div`
  font-size: 16px;
  color: #888;
  text-align: center;
  margin-top: 20px;
`;

interface RecentlyDeletedProps {
  recentlyDeletedItems: string[];
  id: number;
}

const RecentlyDeleted: React.FC<RecentlyDeletedProps> = ({ recentlyDeletedItems, id }) => {
  const { deleteRecentlyDeletedItem, isDeleting } = useDeleteRecentlyDeletedItem();

  // Filter out empty strings
  const filteredItems = recentlyDeletedItems.filter((item) => item.trim() !== "");

  const handleDelete = (item: string) => {
    deleteRecentlyDeletedItem({ id, itemToRemove: item });
  };

  return (
    <Wrapper>
      <Title>Recently Bought</Title>
      {filteredItems.length === 0 ? (
        <EmptyMessage>No items in the recently bought list.</EmptyMessage>
      ) : (
        <ItemsWrapper>
          {filteredItems.map((item: string, index: number) => (
            <Card key={index} disabled={isDeleting} onClick={() => handleDelete(item)}>
              {item.trim()}
            </Card>
          ))}
        </ItemsWrapper>
      )}
    </Wrapper>
  );
};

export default RecentlyDeleted;
