import { NavLink } from "./Header.styles"; // Adjust the import based on your styles location
import { House, Boxes, History } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

// Styled component for the navigation container
const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem; // Space between the buttons
`;

const NavLinks = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavContainer>
      <NavLink as="button" onClick={() => navigate("/home")} $active={location.pathname === "/home"}>
        <House size={18} />
        Home
      </NavLink>
      <NavLink as="button" onClick={() => navigate("/inventory")} $active={location.pathname === "/inventory"}>
        <Boxes size={18} />
        Inventory
      </NavLink>
      <NavLink as="button" onClick={() => navigate("/history")} $active={location.pathname === "/history"}>
        <History size={18} />
        History
      </NavLink>
    </NavContainer>
  );
};

export default NavLinks;
