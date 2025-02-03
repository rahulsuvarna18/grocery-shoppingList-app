import styled from "styled-components";
import useCreateGroceryList from "../services/Mutations/useCreateGroceryList";
import Modal from "../ui/Modal/Modal";
import { Plus } from "lucide-react";
import { useState } from "react";

const CreateButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  width: 140px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 24px 0;

  &:hover {
    background-color: #45a049;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin-top: 8px;
`;

const COLORS = ["#000000", "#FF9B9B", "#FFB4B4", "#FFDEB4", "#FFE4C0", "#FFF3E2", "#B4E4FF", "#95BDFF", "#DFFFD8", "#B4F8C8", "#A0E4CB", "#FFABE1", "#C0DEFF", "#E3DFFD", "#FFF4D2", "#FFCEFE"];

const CreateGroceryList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const { createGroceryList, isCreating, error } = useCreateGroceryList();

  const handleSubmit = () => {
    if (!name.trim()) return;

    createGroceryList(
      { name: name.trim(), color: selectedColor },
      {
        onSuccess: () => {
          setName("");
          setIsModalOpen(false);
          setSelectedColor(COLORS[0]);
        },
      }
    );
  };

  return (
    <>
      <CreateButton onClick={() => setIsModalOpen(true)}>
        <Plus size={20} />
        Create List
      </CreateButton>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Create New List</Modal.Header>
        <Modal.Content>
          <Input autoFocus type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter list name..." disabled={isCreating} />
          <ColorGrid>
            {COLORS.map((color) => (
              <ColorOption key={color} $bgColor={color} $isSelected={selectedColor === color} onClick={() => setSelectedColor(color)} />
            ))}
          </ColorGrid>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </Modal.Content>
        <Modal.Footer>
          <Modal.Button onClick={() => setIsModalOpen(false)}>Cancel</Modal.Button>
          <Modal.Button onClick={handleSubmit} disabled={isCreating || !name.trim()}>
            {isCreating ? "Creating..." : "Create"}
          </Modal.Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateGroceryList;
