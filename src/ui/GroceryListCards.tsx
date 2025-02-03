import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useDeleteGroceryList from "../services/Mutations/useDeleteGroceryList";
import Modal from "./Modal/Modal";
import { Trash2, Pencil, Tag, Share2 } from "lucide-react";
import useUpdateGroceryList from "../services/Mutations/useUpdateGroceryList";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 320px);
  gap: 20px;
  width: 100%;
  justify-content: center;
`;

const Card = styled.div`
  padding: 28px;
  border-radius: 12px;
  background-color: #ffffff;
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
  position: relative;
`;

const ListInfo = styled.div`
  color: #666;
  font-size: 0.9rem;
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

const ButtonGroup = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button<{ $variant?: "delete" }>`
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
    background-color: ${(props) => (props.$variant === "delete" ? "#fee2e2" : "#d1fae5")};
    color: ${(props) => (props.$variant === "delete" ? "#ef4444" : "#4caf50")};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 16px;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
  }
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-top: 16px;
`;

const ColorOption = styled.button<{ $bgColor: string; $isSelected: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  border: 2px solid ${(props) => (props.$isSelected ? "#4caf50" : "#e0e0e0")};
  background-color: ${(props) => props.$bgColor};
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ShareIcon = styled(Share2)`
  position: absolute;
  bottom: 20px;
  right: 60px;
  cursor: pointer;
  color: #666;
  transition: all 0.2s ease;

  &:hover {
    color: #4caf50;
  }
`;

const COLORS = ["#000000", "#FF9B9B", "#FFB4B4", "#FFDEB4", "#FFE4C0", "#FFF3E2", "#B4E4FF", "#95BDFF", "#DFFFD8", "#B4F8C8", "#A0E4CB", "#FFABE1", "#C0DEFF", "#E3DFFD", "#FFF4D2", "#FFCEFE"];

interface GroceryListCardProps {
  groceryLists: {
    id: number;
    created_at: string;
    grocery_list_name: string;
    user_id: string;
    color: string;
  }[];
}

const GroceryListCard: React.FC<GroceryListCardProps> = ({ groceryLists }) => {
  const navigate = useNavigate();
  const { deleteList, isDeleting } = useDeleteGroceryList();
  const { updateList, isUpdating } = useUpdateGroceryList();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<{ id: number; name: string; color: string } | null>(null);
  const [editName, setEditName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [email, setEmail] = useState("");

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

  const handleEdit = (e: React.MouseEvent, list: { id: number; name: string; color: string }) => {
    e.stopPropagation();
    setSelectedList(list);
    setEditName(list.name);
    setSelectedColor(list.color || "#FFFFFF");
    setEditModalOpen(true);
  };

  const handleUpdate = () => {
    if (selectedList && editName.trim()) {
      updateList(
        {
          id: selectedList.id,
          name: editName.trim(),
          color: selectedColor || "#FFFFFF",
        },
        {
          onSuccess: () => {
            setEditModalOpen(false);
            setSelectedList(null);
            setEditName("");
            setSelectedColor("");
          },
        }
      );
    }
  };

  const handleAddUser = () => {
    console.log("Adding user:", email);
    setShareModalOpen(false);
    setEmail("");
  };

  const getItemCount = () => {
    return "0 items";
  };

  return (
    <>
      <Wrapper>
        {groceryLists.map((groceryList) => (
          <Card key={groceryList.id} onClick={() => navigate(`/list/${groceryList.grocery_list_name.toLowerCase().replace(/ /g, "-")}`)}>
            <div>
              <ListTitle>{groceryList.grocery_list_name}</ListTitle>
              <ListInfo>Created on {new Date(groceryList.created_at).toLocaleDateString()}</ListInfo>
              <ItemCount>{getItemCount()}</ItemCount>
              <Tag size={18} color={groceryList.color || "#000"} style={{ position: "absolute", bottom: "20px", right: "20px" }} />
            </div>
            <ShareIcon
              size={18}
              onClick={(e) => {
                e.stopPropagation();
                setShareModalOpen(true);
              }}
            />
            <ButtonGroup>
              <IconButton
                onClick={(e) =>
                  handleEdit(e, {
                    id: groceryList.id,
                    name: groceryList.grocery_list_name,
                    color: groceryList.color,
                  })
                }
                disabled={isUpdating}
              >
                <Pencil size={18} />
              </IconButton>
              <IconButton $variant="delete" onClick={(e) => handleDelete(e, groceryList.id)} disabled={isDeleting}>
                <Trash2 size={18} />
              </IconButton>
            </ButtonGroup>
          </Card>
        ))}
      </Wrapper>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Delete List</Modal.Header>
        <Modal.Content>Are you sure you want to delete this list? This action cannot be undone.</Modal.Content>
        <Modal.Footer>
          <Modal.Button onClick={() => setModalOpen(false)}>Cancel</Modal.Button>
          <Modal.Button $variant="danger" onClick={confirmDelete}>
            Delete
          </Modal.Button>
        </Modal.Footer>
      </Modal>

      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Modal.Header>Edit List</Modal.Header>
        <Modal.Content>
          <Input autoFocus type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Enter new list name..." disabled={isUpdating} />
          <ColorGrid>
            {COLORS.map((color) => (
              <ColorOption key={color} $bgColor={color} $isSelected={selectedColor === color} onClick={() => setSelectedColor(color)} />
            ))}
          </ColorGrid>
        </Modal.Content>
        <Modal.Footer>
          <Modal.Button onClick={() => setEditModalOpen(false)}>Cancel</Modal.Button>
          <Modal.Button $variant="primary" onClick={handleUpdate} disabled={isUpdating || !editName.trim() || (editName === selectedList?.name && selectedColor === selectedList?.color)}>
            {isUpdating ? "Updating..." : "Update"}
          </Modal.Button>
        </Modal.Footer>
      </Modal>

      <Modal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)}>
        <Modal.Header>Share List</Modal.Header>
        <Modal.Content>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email to share..." />
        </Modal.Content>
        <Modal.Footer>
          <Modal.Button onClick={() => setShareModalOpen(false)}>Cancel</Modal.Button>
          <Modal.Button $variant="primary" onClick={handleAddUser}>
            Add User
          </Modal.Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GroceryListCard;
