import React from "react";
import { Wrapper, Title, Text, Icon } from "./EmptyState.styles";

interface EmptyStateProps {
  title: string;
  text?: string;
  icon?: React.ReactNode; // Optional icon prop
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, text, icon }) => {
  return (
    <Wrapper>
      {icon && <Icon>{icon}</Icon>}
      <Title>{title}</Title>
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default EmptyState;
