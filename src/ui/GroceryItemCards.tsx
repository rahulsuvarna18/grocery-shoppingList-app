import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ShoppingBasket, Edit2 } from "lucide-react";
import EmptyState from "../components/EmptyState/EmptyState";
import { Database } from "../types/database.types";
import { removeItemFromGroceryList, updateGroceryItemStatus } from "../services/apiGroceryList";
import { getGroceryItemById } from "../services/apiGroceryItems";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Modal from "./Modal/Modal";
import useUpdateGroceryItemDescription from "../services/Mutations/useUpdateGroceryItemDescription";

type UserGroceryItem = Database["public"]["Tables"]["user_grocery_items"]["Row"];
// type GroceryItem = Database["public"]["Tables"]["grocery_items"]["Row"];

interface GroceryItemCardsProps {
  groceryItems: UserGroceryItem[];
  id: number;
}

const GroceryItemCards: React.FC<GroceryItemCardsProps> = ({ groceryItems, id }) => {
  const queryClient = useQueryClient();

  const { mutate: removeItem, isPending: isRemoving } = useMutation({
    mutationFn: removeItemFromGroceryList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groceryListItems", id] });
    },
  });

  const { mutate: toggleItemStatus, isPending: isToggling } = useMutation({
    mutationFn: ({ itemId, isBought }: { itemId: number; isBought: boolean }) => updateGroceryItemStatus(itemId, isBought),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groceryListItems", id] });
    },
  });

  const handleDelete = (itemId: number) => {
    removeItem(itemId);
  };

  const handleToggleStatus = (itemId: number, currentStatus: boolean) => {
    toggleItemStatus({ itemId, isBought: !currentStatus });
  };

  if (groceryItems.length === 0) {
    return <EmptyState icon={<ShoppingBasket size={32} />} title="Your Shopping List is Empty" text="Start adding items to your list using the input field above. Each item you add will appear here as a card." />;
  }

  return (
    <Wrapper>
      {groceryItems.map((item) => (
        <GroceryItemCard key={item.id} item={item} onDelete={handleDelete} onToggleStatus={handleToggleStatus} isRemoving={isRemoving} isToggling={isToggling} listId={id} />
      ))}
    </Wrapper>
  );
};

interface GroceryItemCardProps {
  item: UserGroceryItem;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, currentStatus: boolean) => void;
  isRemoving: boolean;
  isToggling: boolean;
  listId: number;
}

const GroceryItemCard: React.FC<GroceryItemCardProps> = ({ item, onDelete, onToggleStatus, isRemoving, isToggling, listId }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { updateDescription, isUpdating } = useUpdateGroceryItemDescription();

  // Fetch grocery item data if we have a grocery_item_id
  const { data: groceryItem } = useQuery({
    queryKey: ["groceryItem", item.grocery_item_id],
    queryFn: () => getGroceryItemById(item.grocery_item_id!),
    enabled: !!item.grocery_item_id,
  });

  // Use grocery item data if available, otherwise use user grocery item data
  const displayName = groceryItem?.name || item.name || "";
  const itemDetails = groceryItem?.item_details || [];

  const handleUpdateDescription = (newDescription: string) => {
    updateDescription({
      itemId: item.id,
      description: newDescription,
      groceryListId: listId,
    });
    setIsEditModalOpen(false);
  };

  return (
    <>
      <ItemCard $isBought={item.is_bought}>
        <ItemInitial>{displayName.charAt(0).toUpperCase()}</ItemInitial>
        <ItemContent>
          <ItemName>{displayName}</ItemName>
          {item.description && <ItemDescription>{item.description}</ItemDescription>}
        </ItemContent>
        <ItemActions>
          <ActionButton onClick={() => onToggleStatus(item.id, item.is_bought)} disabled={isToggling} title={item.is_bought ? "Mark as not bought" : "Mark as bought"}>
            {item.is_bought ? "✓" : "○"}
          </ActionButton>
          <ActionButton onClick={() => setIsEditModalOpen(true)} disabled={isUpdating} title="Edit item" className="edit">
            <Edit2 size={14} />
          </ActionButton>
          <ActionButton onClick={() => onDelete(item.id)} disabled={isRemoving} title="Remove item" className="delete">
            ×
          </ActionButton>
        </ItemActions>
      </ItemCard>

      <EditItemModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} itemName={displayName} currentDescription={item.description || ""} itemDetails={itemDetails} onUpdate={handleUpdateDescription} isUpdating={isUpdating} />
    </>
  );
};

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  currentDescription: string;
  itemDetails: string[];
  onUpdate: (description: string) => void;
  isUpdating: boolean;
}

const EditItemModal: React.FC<EditItemModalProps> = ({ isOpen, onClose, itemName, currentDescription, itemDetails, onUpdate, isUpdating }) => {
  const [description, setDescription] = useState(currentDescription);

  // Reset description when modal opens/closes
  useEffect(() => {
    setDescription(currentDescription);
  }, [isOpen, currentDescription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(description.trim());
  };

  const handleClose = () => {
    onClose();
    setDescription(currentDescription); // Reset on close
  };

  const handleItemDetailClick = (detail: string) => {
    const newDescription = description ? `${description}, ${detail}` : detail;
    setDescription(newDescription);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Header>Edit {itemName}</Modal.Header>
      <Modal.Content>
        <EditForm onSubmit={handleSubmit}>
          <EditInput type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add a description..." autoFocus />
          {itemDetails.length > 0 && (
            <ItemDetailsList>
              {itemDetails.map((detail, index) => (
                <ItemDetailChip key={index} onClick={() => handleItemDetailClick(detail)} type="button">
                  {detail}
                </ItemDetailChip>
              ))}
            </ItemDetailsList>
          )}
        </EditForm>
      </Modal.Content>
      <Modal.Footer>
        <Modal.Button onClick={handleClose}>Cancel</Modal.Button>
        <Modal.Button $variant="primary" onClick={handleSubmit} disabled={isUpdating}>
          Save Changes
        </Modal.Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GroceryItemCards;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  width: 100%;
  padding: 16px 0;
`;

interface ItemCardProps {
  $isBought: boolean;
}

const ItemCard = styled.div<ItemCardProps>`
  position: relative;
  width: 100%;
  background: ${(props) => (props.$isBought ? "#f0fdf4" : "linear-gradient(to bottom right, #fee2e2, #ffffff)")};
  border: 1px solid ${(props) => (props.$isBought ? "#4caf50" : "#e0e0e0")};
  border-radius: 16px;
  padding: 16px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: ${(props) => (props.$isBought ? 0.8 : 1)};
`;

const ItemInitial = styled.div`
  width: 48px;
  height: 48px;
  background-color: #f0fdf4;
  color: #4caf50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
`;

const ItemName = styled.span`
  font-size: 16px;
  color: #333;
  text-align: center;
  font-weight: 500;
`;

const ItemDescription = styled.p`
  font-size: 12px;
  color: #666;
  text-align: center;
  margin: 4px 0 0;
  font-style: italic;
`;

const ItemActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  background: white;
  color: #4caf50;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s ease;

  &:hover {
    background: #f0fdf4;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &.delete {
    color: #ef4444;
    &:hover {
      background: #fee2e2;
    }
  }

  &.edit {
    color: #3498db;
    &:hover {
      background: #ebf8ff;
    }
  }
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const ItemDetailsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ItemDetailChip = styled.button`
  padding: 4px 12px;
  background-color: #f1f1f1;
  border: none;
  border-radius: 16px;
  font-size: 12px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e1e1e1;
  }
`;
