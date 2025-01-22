import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import supabase from "../services/supabase";
import { useState } from "react";
import { LogOut, ShoppingCart } from "lucide-react";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 4rem;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 48px;
  cursor: pointer;
  color: #4caf50;
  font-weight: 600;
  font-size: 1.25rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 48px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 24px;
  background-color: #f8f9fa;
`;

const Avatar = styled.div<{ $hasImage?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${props => props.$hasImage ? 'transparent' : '#e9ecef'};
  color: #4caf50;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.875rem;
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserName = styled.span`
  font-weight: 500;
  color: #333;
  font-size: 0.875rem;
`;

const IconButton = styled.button`
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
    color: #333;
  }
`;

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const getUserAvatar = () => {
    if (!user) return null;

    let avatarUrl = user.user_metadata?.avatar_url || 
                    user.user_metadata?.picture || 
                    user.user_metadata?.user_picture;

    if (avatarUrl && avatarUrl.includes('googleusercontent.com')) {
      avatarUrl = avatarUrl.replace('=s96-c', '=s400-c');
    }

    const fullName = user.user_metadata?.full_name || user.email || '';
    const initial = fullName.charAt(0).toUpperCase();

    if (avatarUrl && !imageError) {
      return (
        <UserImage 
          src={avatarUrl} 
          alt={fullName}
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          onError={(e) => {
            console.error('Error loading avatar image:', e);
            setImageError(true);
          }}
        />
      );
    }

    return initial;
  };

  const hasValidImage = Boolean(
    !imageError && 
    (user?.user_metadata?.avatar_url || 
     user?.user_metadata?.picture || 
     user?.user_metadata?.user_picture)
  );

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer onClick={() => navigate('/home')}>
          <ShoppingCart size={24} />
          <span>Grocer AI</span>
        </LogoContainer>
        <UserSection>
          <UserInfo>
            <Avatar $hasImage={hasValidImage}>
              {getUserAvatar()}
            </Avatar>
            <UserName>
              {user?.user_metadata?.full_name || user?.email}
            </UserName>
          </UserInfo>
          <IconButton onClick={handleLogout} aria-label="Logout">
            <LogOut size={20} />
          </IconButton>
        </UserSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 