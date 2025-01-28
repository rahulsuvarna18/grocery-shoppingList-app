import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Pencil } from "lucide-react";
import { uploadAvatar } from "../services/apiProfile";
import { AvatarImage, AvatarPlaceholder, AvatarSection, AvatarUpload, AvatarWrapper, Container, ProfileCard } from "../components/Dashboard/Dashboard.styles";
import ProfileForm from "../components/Dashboard/ProfileForm";

import { useUserMetadata } from "../hooks/useUserMetadata";

const Dashboard = () => {
  const { user } = useAuth();
  const { userMetadata, updateMetadata, isUpdating } = useUserMetadata();
  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email || "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (userMetadata) {
      setFormData((prev) => ({
        ...prev,
        fullName: userMetadata.full_name || "",
      }));
      setImagePreview(userMetadata.avatar_url);
    }
  }, [userMetadata]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let avatarUrl = userMetadata?.avatar_url;

      if (selectedFile) {
        avatarUrl = await uploadAvatar(selectedFile);
      }

      await updateMetadata({
        full_name: formData.fullName,
        avatar_url: avatarUrl,
      });

      setSelectedFile(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      setImagePreview(userMetadata?.avatar_url || null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        console.log("Updated imagePreview after file selection:", reader.result);
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
            {imagePreview ? <AvatarImage src={imagePreview} alt="Profile" /> : <AvatarPlaceholder>{user?.user_metadata?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}</AvatarPlaceholder>}
            {!imagePreview && user?.user_metadata?.provider === "google" && <AvatarImage src={user?.user_metadata?.picture} alt="Google Profile" />}
            <AvatarUpload>
              <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
              <Pencil size={16} color="white" />
            </AvatarUpload>
          </AvatarWrapper>
        </AvatarSection>

        <ProfileForm formData={formData} isUpdating={isUpdating} handleChange={handleChange} handleSubmit={handleSubmit} user={user} />
      </ProfileCard>
    </Container>
  );
};

export default Dashboard;
