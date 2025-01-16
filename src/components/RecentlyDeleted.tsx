import React from "react";
import styled from "styled-components";

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

interface RecentlyDeletedProps {
  recentlyDeletedItems: string[];
}

const RecentlyDeleted: React.FC<RecentlyDeletedProps> = ({ recentlyDeletedItems }) => {
  return (
    <Wrapper>
      <Title>Recently Deleted</Title>
      <ItemsWrapper>
        {recentlyDeletedItems.map((item: string, index: number) => (
          <Card key={index}>{item.trim()}</Card>
        ))}
      </ItemsWrapper>
    </Wrapper>
  );
};

export default RecentlyDeleted;
