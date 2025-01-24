import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ShoppingBag, RotateCcw, Trash2 } from "lucide-react";
import useDeleteRecentlyDeletedItem from "../services/Mutations/useDeleteRecentlyDeletedItem";
import useRestoreGroceryItem from "../services/Mutations/useRestoreGroceryItem";
import { getItemIcon } from "../services/iconService";
import EmptyState from "./EmptyState/EmptyState";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin-top: 32px;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: #4caf50;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
  width: 100%;
`;

const ItemWrapper = styled.div`
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.9);
    }
  }

  &.deleting {
    animation: fadeOut 0.2s ease forwards;
  }
`;

const ItemCard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: linear-gradient(to bottom right, #f0fdf4, #ffffff);
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;
    background: #4caf50;
    border-radius: 0 16px 0 16px;
    opacity: 0.8;
  }

  &::after {
    content: "✓";
    position: absolute;
    top: 2px;
    right: 7px;
    color: white;
    font-size: 12px;
    font-weight: bold;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(76, 175, 80, 0.15);
    border-color: #4caf50;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ItemName = styled.span`
  font-size: 13px;
  color: #2c3e50;
  font-weight: 500;
  text-align: center;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonGroup = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${ItemCard}:hover & {
    opacity: 1;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4caf50;

  &:hover {
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled(IconButton)`
  color: #ef4444;
`;

const ItemInitial = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f0fdf4;
  color: #4caf50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
`;

interface RecentlyDeletedProps {
  recentlyDeletedItems: string[];
  id: number;
}

const RecentlyDeleted: React.FC<RecentlyDeletedProps> = ({ recentlyDeletedItems, id }) => {
  const { deleteRecentlyDeletedItem, isDeleting } = useDeleteRecentlyDeletedItem();
  const { restoreGroceryItem, isRestoring } = useRestoreGroceryItem();
  const [itemIcons, setItemIcons] = useState<{ [key: string]: string }>({});
  const filteredItems = recentlyDeletedItems.filter((item) => item.trim() !== "");
  const [deletingItems, setDeletingItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadIcons = async () => {
      // Only load icons for items that don't already have icons
      const newIcons: { [key: string]: string } = { ...itemIcons };
      let hasNewIcons = false;

      for (const item of filteredItems) {
        if (!newIcons[item]) {
          newIcons[item] = await getItemIcon(item);
          hasNewIcons = true;
        }
      }

      // Only update state if we have new icons
      if (hasNewIcons) {
        setItemIcons(newIcons);
      }
    };

    loadIcons();
  }, [filteredItems]); // itemIcons removed from dependency array

  const handleRestore = (item: string) => {
    // Add item back to grocery list
    restoreGroceryItem({ id, newItem: item });
    // Remove from recently deleted
    deleteRecentlyDeletedItem({ id, itemToRemove: item });
  };

  const handleDelete = (item: string) => {
    setDeletingItems((prev) => new Set([...prev, item]));
    setTimeout(() => {
      deleteRecentlyDeletedItem({ id, itemToRemove: item });
    }, 200); // Match animation duration
  };

  if (filteredItems.length === 0) {
    return (
      <Wrapper>
        <Title>
          <RotateCcw size={24} />
          Recently Bought
        </Title>
        <EmptyState icon={<ShoppingBag size={32} />} title="No Recently Bought Items" text="Done shopping? Add items to this list by clicking the card above." />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Title>
        <RotateCcw size={24} />
        Recently Bought
      </Title>
      <CardsContainer>
        {filteredItems.map((item) => (
          <ItemWrapper key={item} className={deletingItems.has(item) ? "deleting" : ""}>
            <ItemCard>
              <ItemInitial>{item.charAt(0).toUpperCase()}</ItemInitial>
              <ItemName>{item}</ItemName>
              <ButtonGroup>
                <DeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item);
                  }}
                  disabled={isDeleting}
                  title="Remove item"
                >
                  <Trash2 size={16} />
                </DeleteButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRestore(item);
                  }}
                  disabled={isDeleting || isRestoring}
                  title="Restore item"
                >
                  <RotateCcw size={16} />
                </IconButton>
              </ButtonGroup>
            </ItemCard>
          </ItemWrapper>
        ))}
      </CardsContainer>
    </Wrapper>
  );
};

export default RecentlyDeleted;
