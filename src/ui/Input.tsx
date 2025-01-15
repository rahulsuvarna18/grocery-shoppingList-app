import React from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import useUpdateGroceryItems from "../services/Mutations/useUpdateGroceryItems";

const InputContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 16px 0;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const AddButton = styled.button`
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
    transition: 0.3s;
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

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    updateGroceryItems(
      { id: selectedListId, newItem: data.newItem }, // Replace `1` with the actual ID of the list
      {
        onSuccess: () => {
          reset(); // Reset the input field after successful addition
        },
      }
    );
  };

  return (
    <InputContainer>
      {/* Use handleSubmit from React Hook Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledInput {...register("newItem", { required: "Please enter a grocery item." })} type="text" placeholder="What do you need to buy?" />
        <AddButton type="submit" disabled={isUpdating}>
          {isUpdating ? "Adding..." : "Add"}
        </AddButton>
      </form>
    </InputContainer>
  );
};

export default Input;
