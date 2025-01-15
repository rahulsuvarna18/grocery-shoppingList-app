import React from "react";
import styled from "styled-components";

interface AppLayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #4caf50;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  color: #4caf50;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
`;

const WelcomeHeading = styled.h1`
  color: #333;
  margin-top: 16px;
`;

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header>
        <Logo>Grocery App</Logo>
        <Avatar>R</Avatar>
      </Header>
      <WelcomeHeading>Welcome to your grocery list!</WelcomeHeading>
      {/* <Input selectedListId /> */}
      {children}
    </LayoutContainer>
  );
};

export default AppLayout;
