import { useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "../services/supabase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";
import AuthForm from "../components/Auth/AuthForm";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 0;
  overflow: hidden;
`;

const LoginCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  text-align: center;
  max-width: 400px;
  width: calc(100% - 40px);
  margin: 20px;
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #4caf50;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 2.5rem;
  font-size: 1rem;
  line-height: 1.5;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 32px;
  background-color: white;
  border: 2px solid #eee;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f8f8f8;
    border-color: #4caf50;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const GoogleIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0;
  color: #666;
  font-size: 14px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #ddd;
  }
`;

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<"google" | "email">("google");

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/home`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>🛒</Logo>
        <Title>Welcome to Grocery App</Title>
        <Subtitle>Simplify your shopping experience with smart grocery lists and easy collaboration.</Subtitle>

        {authMode === "google" ? (
          <>
            <GoogleButton onClick={handleGoogleLogin}>
              <GoogleIcon src="/google-icon.svg" alt="Google" />
              Continue with Google
            </GoogleButton>
            <OrDivider>or</OrDivider>
            <GoogleButton onClick={() => setAuthMode("email")}>Continue with Email</GoogleButton>
          </>
        ) : (
          <>
            <AuthForm />
            <OrDivider>or</OrDivider>
            <GoogleButton onClick={() => setAuthMode("google")}>Back to Google Login</GoogleButton>
          </>
        )}
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
