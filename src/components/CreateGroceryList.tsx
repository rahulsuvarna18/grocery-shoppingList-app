import React, { useState } from 'react';
import styled from 'styled-components';
import useCreateGroceryList from '../services/Mutations/useCreateGroceryList';

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-grow: 1;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const CreateGroceryList = () => {
  const [name, setName] = useState('');
  const { createGroceryList, isCreating } = useCreateGroceryList();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createGroceryList({ name: name.trim() });
    setName('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter new list name..."
        disabled={isCreating}
      />
      <Button type="submit" disabled={isCreating || !name.trim()}>
        {isCreating ? 'Creating...' : 'Create List'}
      </Button>
    </Form>
  );
};

export default CreateGroceryList; 