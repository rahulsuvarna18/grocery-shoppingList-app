import React from "react";
import styled from "styled-components";
import Header from "./Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      {children}
    </LayoutContainer>
  );
};

export default AppLayout;
