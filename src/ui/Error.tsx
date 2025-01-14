import React from "react";
import styled from "styled-components";

interface ErrorProps {
  message: string; // The error message to display
  retry?: () => void; // Optional retry function for error recovery
}

const Error: React.FC<ErrorProps> = ({ message, retry }) => {
  return (
    <ErrorWrapper>
      <ErrorCard>
        <ErrorHeading>Oops! Something went wrong.</ErrorHeading>
        <ErrorMessage>{message}</ErrorMessage>
        {retry && <RetryButton onClick={retry}>Retry</RetryButton>}
      </ErrorCard>
    </ErrorWrapper>
  );
};

export default Error;

// Styled components
const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const ErrorCard = styled.div`
  padding: 20px 30px;
  border: 1px solid #ffcccc;
  border-radius: 10px;
  background-color: #ffe6e6;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ErrorHeading = styled.h2`
  margin: 0 0 10px;
  color: #d32f2f;
  font-size: 1.5rem;
`;

const ErrorMessage = styled.p`
  color: #9e9e9e;
  margin: 0 0 20px;
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #3eaf0e;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #358d0c;
  }
`;
