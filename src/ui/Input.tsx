import React from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import useUpdateGroceryItems from "../services/Mutations/useUpdateGroceryItems";

const InputContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 24px 0;
`;

const Form = styled.form`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  font-size: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f8f9fa;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4caf50;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const AddButton = styled.button`
  padding: 12px 24px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #43a047;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #a8e0ab;
    cursor: not-allowed;
    transform: none;
  }
`;

// Define the form structure
interface FormValues {
  newItem: string;
}

interface InputProps {
  selectedListId: number; // ID of the selected grocery list
}

const Input: React.FC<InputProps> = ({ selectedListId }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { updateGroceryItems, isUpdating } = useUpdateGroceryItems();

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const capitalizedItem = capitalizeFirstLetter(data.newItem.trim());
    
    updateGroceryItems(
      { id: selectedListId, newItem: capitalizedItem },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  return (
    <InputContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <StyledInput 
          {...register("newItem", { required: "Please enter a grocery item." })} 
          type="text" 
          placeholder="Add an item to your list..." 
        />
        <AddButton type="submit" disabled={isUpdating}>
          {isUpdating ? "Adding..." : "Add Item"}
        </AddButton>
      </Form>
    </InputContainer>
  );
};

export default Input;
