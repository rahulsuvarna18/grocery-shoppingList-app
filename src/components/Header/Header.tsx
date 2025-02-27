import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import supabase from "../../services/supabase";
import { useState } from "react";
import { LogOut, ShoppingCart, Menu, X, Boxes, UserIcon } from "lucide-react";
import { Avatar, HeaderContainer, HeaderContent, IconButton, LogoContainer, MenuBackdrop, MenuButton, MenuDropdown, MenuLink, MenuLogoutButton, MenuUserInfo, UserImage, UserName, UserSection } from "./Header.styles";
import NavLinks from "./NavLinks";
import { useUserMetadata } from "../../hooks/useUserMetadata";
// import UserSection from "./UserSection";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userMetadata, isLoading } = useUserMetadata();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
  };

  const getUserAvatar = () => {
    if (isLoading) return "...";
    if (!user || !userMetadata) return null;

    const avatarUrl = userMetadata.avatar_url;
    const fullName = userMetadata.full_name || user.email || "";
    const initial = fullName.charAt(0).toUpperCase();

    if (avatarUrl && !imageError) {
      return <UserImage src={avatarUrl} alt={fullName} onError={() => setImageError(true)} onLoad={() => setImageError(false)} style={{ objectFit: "cover" }} loading="eager" crossOrigin="anonymous" />;
    }

    return initial;
  };

  const hasValidImage = Boolean(!imageError && userMetadata?.avatar_url);

  const handleUserSectionClick = () => {
    navigate("/dashboard");
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer onClick={() => navigate("/home")}>
          <ShoppingCart size={24} />
          <span>Grocer AI</span>
        </LogoContainer>

        <NavLinks />

        {/* Desktop view */}
        <UserSection onClick={handleUserSectionClick} style={{ cursor: "pointer" }}>
          <Avatar $hasImage={hasValidImage}>{getUserAvatar()}</Avatar>
          <UserName>{isLoading ? "Loading..." : userMetadata?.full_name || user?.email}</UserName>
          <IconButton onClick={handleLogout} aria-label="Logout">
            <LogOut size={20} />
          </IconButton>
        </UserSection>

        {/* Mobile view */}
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</MenuButton>

        <MenuDropdown $isOpen={isMenuOpen}>
          <MenuUserInfo>
            <Avatar $hasImage={hasValidImage}>{getUserAvatar()}</Avatar>
            <UserName>{isLoading ? "Loading..." : userMetadata?.full_name || user?.email}</UserName>
          </MenuUserInfo>

          <MenuLink as="button" onClick={() => navigate("/dashboard")}>
            <UserIcon size={18} />
            Dashboard
          </MenuLink>
          <MenuLink as="button" onClick={() => navigate("/inventory")}>
            <Boxes size={18} />
            Inventory
          </MenuLink>
          <MenuLogoutButton onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </MenuLogoutButton>
        </MenuDropdown>

        <MenuBackdrop $isOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
