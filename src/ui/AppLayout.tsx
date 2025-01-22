import React, { useState } from "react";
import styled from "styled-components";
import supabase from "../services/supabase";
import { useAuth } from "../context/AuthContext";

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

const Avatar = styled.div<{ hasImage?: boolean }>`
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
  overflow: hidden;
  
  ${({ hasImage }) => hasImage && `
    padding: 0;
    background-color: transparent;
  `}

  &[data-show-initial="true"] {
    padding: 0;
    background-color: white;
    color: #4caf50;
  }
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const WelcomeHeading = styled.h1`
  color: #333;
  margin-top: 16px;
`;

const LogoutButton = styled.button`
  padding: 8px 16px;
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 16px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const getUserAvatar = () => {
    if (!user) return null;

    const avatarUrl = user.user_metadata?.avatar_url;
    const fullName = user.user_metadata?.full_name || user.email || '';
    const initial = fullName.charAt(0).toUpperCase();

    if (avatarUrl && avatarUrl.trim() !== '' && !imageError) {
      return (
        <UserImage 
          src={avatarUrl} 
          alt={fullName}
          onError={() => {
            setImageError(true);
          }}
        />
      );
    }

    return initial;
  };

  // Determine if we should show the image version of avatar
  const hasValidImage = user?.user_metadata?.avatar_url && 
                       user.user_metadata.avatar_url.trim() !== '' &&
                       !imageError;

  return (
    <LayoutContainer>
      <Header>
        <Logo>Grocery App</Logo>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            hasImage={hasValidImage}
            data-show-initial={!hasValidImage}
          >
            {getUserAvatar()}
          </Avatar>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </div>
      </Header>
      <WelcomeHeading>
        Welcome {user?.user_metadata?.full_name || 'to your grocery list'}!
      </WelcomeHeading>
      {children}
    </LayoutContainer>
  );
};

export default AppLayout;
