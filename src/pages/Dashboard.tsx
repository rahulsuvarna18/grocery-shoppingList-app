import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { Camera, Pencil } from "lucide-react";
// import { UserIcon, Camera } from "lucide-react";
// import useUpdateProfile from "../services/Mutations/useUpdateProfile";
import useUpdateProfile from "../services/Mutations/useUpdateProfile";
import { uploadAvatar } from "../services/apiProfile";
// import { supabase } from "../services/supabase";
import supabase from "../services/supabase";
// import { uploadAvatar } from "../services/apiProfile";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const AvatarWrapper = styled.div`
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

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarUpload = styled.label`
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const SaveButton = styled.button`
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

const Dashboard = () => {
  const { user } = useAuth();
  const { updateProfile, isUpdating } = useUpdateProfile();
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || "",
    email: user?.email || "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(user?.user_metadata?.avatar_url || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let avatarUrl;
      if (selectedFile) {
        avatarUrl = await uploadAvatar(selectedFile);
      }

      await updateProfile({
        fullName: formData.fullName,
        ...(avatarUrl && { avatarUrl }),
      });

      // Reset file selection
      setSelectedFile(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Reset preview on error
      setImagePreview(user?.user_metadata?.avatar_url || null);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  return (
    <Container>
      <ProfileCard>
        <AvatarSection>
          <AvatarWrapper>
            {imagePreview ? <AvatarImage src={imagePreview} alt="Profile" /> : <span style={{ fontSize: "2rem", color: "#4caf50" }}>{user?.user_metadata?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}</span>}
            {imagePreview ? <p>True</p> : <p>False</p>}
            <AvatarUpload>
              <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
              <Pencil size={16} color="white" />
            </AvatarUpload>
          </AvatarWrapper>
        </AvatarSection>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Full Name</Label>
            <Input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={user?.app_metadata?.provider === "google"} />
            {user?.app_metadata?.provider === "google" && <small style={{ color: "#666" }}>Email cannot be changed for Google-authenticated accounts</small>}
          </FormGroup>

          <SaveButton type="submit" disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save Changes"}
          </SaveButton>
        </Form>
      </ProfileCard>
    </Container>
  );
};

export default Dashboard;
