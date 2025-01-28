import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${(props) => {
    switch (props.size) {
      case "small":
        return "8px 16px";
      case "large":
        return "16px 32px";
      default:
        return "12px 24px";
    }
  }};
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  background-color: ${(props) => (props.variant === "secondary" ? "white" : "#4caf50")};
  color: ${(props) => (props.variant === "secondary" ? "#4caf50" : "white")};
  border: ${(props) => (props.variant === "secondary" ? "2px solid #4caf50" : "none")};
  border-radius: 8px;
  font-size: ${(props) => (props.size === "large" ? "18px" : "16px")};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15);
    background-color: ${(props) => (props.variant === "secondary" ? "#f0fdf4" : "#45a049")};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Button = ({ children, ...props }: ButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
