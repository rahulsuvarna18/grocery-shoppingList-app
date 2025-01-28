import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import supabase from "../../services/supabase";
import { useState, useEffect } from "react";
import { LogOut, ShoppingCart, Menu, X, Boxes, UserIcon } from "lucide-react";
import { getUserMetadata } from "../../services/apiUserMetadata";
import { Database } from "../../types/Supabase";
import { Avatar, HeaderContainer, HeaderContent, IconButton, LogoContainer, MenuBackdrop, MenuButton, MenuDropdown, MenuLink, MenuLogoutButton, MenuUserInfo, UserImage, UserInfo, UserName, UserSection } from "./Header.styles";
import NavLinks from "./NavLinks";
// import UserSection from "./UserSection";

type UserMetadata = Database["public"]["Tables"]["user_metadata"]["Row"];

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMetadata, setUserMetadata] = useState<UserMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserMetadata = async () => {
      if (user) {
        try {
          setIsLoading(true);
          const metadata = await getUserMetadata();
          setUserMetadata(metadata);
          setImageError(false);
        } catch (error) {
          console.error("Error fetching user metadata:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    // Initial fetch
    fetchUserMetadata();

    // Listen for metadata updates
    const handleMetadataUpdate = () => {
      fetchUserMetadata();
    };

    window.addEventListener("userMetadataUpdated", handleMetadataUpdate);

    return () => {
      window.removeEventListener("userMetadataUpdated", handleMetadataUpdate);
    };
  }, [user]);

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
      return (
        <UserImage
          src={avatarUrl}
          alt={fullName}
          onError={() => {
            console.error("Error loading avatar image");
            setImageError(true);
          }}
          onLoad={() => setImageError(false)}
          style={{ objectFit: "cover" }}
          loading="eager"
          crossOrigin="anonymous"
        />
      );
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
