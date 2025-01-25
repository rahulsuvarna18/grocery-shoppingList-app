import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

export const ProfileCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarUpload = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #4caf50;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1);
    background: #45a049;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

export const SaveButton = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #45a049;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const GoogleAuthMessage = styled.small`
  color: #666;
`;

export const AvatarPlaceholder = styled.span`
  font-size: 2rem;
  color: #4caf50;
`;
