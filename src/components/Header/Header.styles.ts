import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.75rem 1rem;

  @media (min-width: 768px) {
    padding: 0.75rem 4rem;
  }
`;

export const LogoContainer = styled.div`
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

export const NavLinks = styled.nav`
  display: none;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

export const NavLink = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => (props.$active ? "#4caf50" : "#666")};
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    color: #4caf50;
    background-color: #f0fdf4;
  }
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  @media (min-width: 768px) {
    display: none;
  }

  &:hover {
    color: #333;
  }
`;

export const MenuBackdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease;
  z-index: 120;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const UserSection = styled.div<{ $isOpen?: boolean }>`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background: white;
  padding: 1rem;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.05);
  transform: translateY(${(props) => (props.$isOpen ? "0" : "120%")});
  transition: transform 0.3s ease;
  z-index: 150;
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};

  @media (min-width: 768px) {
    position: static;
    transform: none;
    padding: 0;
    box-shadow: none;
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 48px;
    visibility: visible;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 24px;
  background-color: #f8f9fa;
`;

export const Avatar = styled.div<{ $hasImage?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${(props) => (props.$hasImage ? "transparent" : "#e9ecef")};
  color: #4caf50;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.875rem;
  border: 1px solid #e0e0e0;
  flex-shrink: 0;
`;

export const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
`;

export const UserName = styled.span`
  font-weight: 500;
  color: #333;
  font-size: 0.875rem;
`;

export const IconButton = styled.button`
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

export const MenuDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  right: 1rem;
  width: 240px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transform: translateY(${(props) => (props.$isOpen ? "0" : "-8px")});
  transition: all 0.2s ease;
  z-index: 150;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MenuUserInfo = styled(UserInfo)`
  margin-bottom: 8px;
  background: transparent;
  justify-content: flex-start;
  padding: 8px;

  &:hover {
    background: #f8f9fa;
    border-radius: 8px;
  }
`;

export const MenuLogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px;
  border: none;
  background: none;
  color: #ef4444;
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background: #fee2e2;
  }
`;

export const MenuLink = styled(NavLink)`
  color: #666;
  width: 100%;
  justify-content: flex-start;

  &:hover {
    background: #f8f9fa;
  }
`;
