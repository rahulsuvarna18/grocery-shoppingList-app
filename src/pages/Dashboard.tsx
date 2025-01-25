import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Pencil } from "lucide-react";
import { uploadAvatar, updateUserMetadata } from "../services/apiProfile";
import { AvatarImage, AvatarPlaceholder, AvatarSection, AvatarUpload, AvatarWrapper, Container, ProfileCard } from "../components/Dashboard/Dashboard.styles";
import ProfileForm from "../components/Dashboard/ProfileForm";
import { getUserMetadata } from "../services/apiUserMetadata";
import { Database } from "../types/Supabase";

type UserMetadata = Database["public"]["Tables"]["user_metadata"]["Row"];

const Dashboard = () => {
  const { user } = useAuth();
  //   const { updateProfile, isUpdating } = useUpdateProfile();
  const [userMetadata, setUserMetadata] = useState<UserMetadata | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email || "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUserMetadata = async () => {
      if (user) {
        try {
          const metadata = await getUserMetadata();
          setUserMetadata(metadata);
          setFormData((prev) => ({
            ...prev,
            fullName: metadata.full_name || "",
          }));
          setImagePreview(metadata.avatar_url);
        } catch (error) {
          console.error("Error fetching user metadata:", error);
        }
      }
    };

    fetchUserMetadata();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      let avatarUrl = userMetadata?.avatar_url;

      if (selectedFile) {
        avatarUrl = await uploadAvatar(selectedFile);
      }

      // Update user_metadata table
      await updateUserMetadata({
        full_name: formData.fullName,
        avatar_url: avatarUrl,
      });

      // Reset file selection
      setSelectedFile(null);

      // Refresh metadata
      const updatedMetadata = await getUserMetadata();
      setUserMetadata(updatedMetadata);
      setImagePreview(updatedMetadata.avatar_url);

      // Force header to refresh by triggering a custom event
      window.dispatchEvent(new CustomEvent("userMetadataUpdated"));
    } catch (error) {
      console.error("Error updating profile:", error);
      setImagePreview(userMetadata?.avatar_url || null);
    } finally {
      setIsUpdating(false);
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
