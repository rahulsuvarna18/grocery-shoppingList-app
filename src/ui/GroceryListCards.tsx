import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import useDeleteGroceryList from "../services/Mutations/useDeleteGroceryList";
import Modal from './Modal/Modal';
import { Trash2 } from "lucide-react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 320px);
  gap: 20px;
  width: 100%;
  justify-content: center;
`;

const Card = styled.div<{ $bgColor: string }>`
  padding: 28px;
  border-radius: 12px;
  background-color: ${props => props.$bgColor};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  border: 1px solid #eee;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
    border-color: #4caf50;
  }
`;

const ListTitle = styled.h3`
  font-size: 1.25rem;
  color: #2c3e50;
  margin: 0 0 12px 0;
  font-weight: 600;
`;

const ListInfo = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fee2e2;
    color: #ef4444;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ItemCount = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background-color: #f0fdf4;
  color: #4caf50;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 12px;
`;

interface GroceryListCardProps {
  groceryLists: { 
    id: number; 
    grocery_list_name: string;
    grocery_items: string;
    color: string;
  }[];
}

const GroceryListCard: React.FC<GroceryListCardProps> = ({ groceryLists }) => {
  const navigate = useNavigate();
  const { deleteList, isDeleting } = useDeleteGroceryList();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setSelectedListId(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedListId) {
      deleteList(selectedListId);
      setModalOpen(false);
    }
  };

  const getItemCount = (items: string) => {
    return items.split(',').filter(item => item.trim()).length;
  };

  return (
    <>
      <Wrapper>
        {groceryLists.map((groceryList) => (
          <Card
            key={groceryList.id}
            onClick={() => navigate(`/list/${groceryList.grocery_list_name.toLowerCase().replace(/ /g, '-')}`)}
            $bgColor={groceryList.color || '#ffffff'}
          >
            <div>
              <ListTitle>{groceryList.grocery_list_name}</ListTitle>
              <ListInfo>Created on {new Date().toLocaleDateString()}</ListInfo>
              <ItemCount>{getItemCount(groceryList.grocery_items)} items</ItemCount>
            </div>
            <DeleteButton
              onClick={(e) => handleDelete(e, groceryList.id)}
              disabled={isDeleting}
            >
              <Trash2 size={18} />
            </DeleteButton>
          </Card>
        ))}
      </Wrapper>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Delete List</Modal.Header>
        <Modal.Content>
          Are you sure you want to delete this list? This action cannot be undone.
        </Modal.Content>
        <Modal.Footer>
          <Modal.Button onClick={() => setModalOpen(false)}>
            Cancel
          </Modal.Button>
          <Modal.Button variant="danger" onClick={confirmDelete}>
            Delete
          </Modal.Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GroceryListCard;
