import { useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "../services/supabase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";
import AuthForm from "../components/Auth/AuthForm";

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #4caf50 0%, #a5d6a7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const LoginCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 28rem;
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
  font-size: 2rem;
  color: #9333ea;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Title = styled.h1`
  color: #111827;
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #4b5563;
  text-align: center;
  font-size: 0.875rem;
  margin-bottom: 2rem;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9fafb;
    border-color: #4caf50;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const GoogleIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

const OrDivider = styled.div`
  position: relative;
  margin: 1.5rem 0;
  text-align: center;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e5e7eb;
  }

  span {
    position: relative;
    background: white;
    padding: 0 0.75rem;
    color: #6b7280;
    font-size: 0.75rem;
    text-transform: uppercase;
  }
`;

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<"google" | "email">("google");

  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/home`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
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
        <Title>Welcome Back</Title>
        <Subtitle>Sign in to your account to continue</Subtitle>

        {authMode === "google" ? (
          <>
            <GoogleButton onClick={handleGoogleLogin}>
              <GoogleIcon src="/google-icon.svg" alt="Google" />
              Continue with Google
            </GoogleButton>
            <OrDivider>
              <span>or continue with</span>
            </OrDivider>
            <GoogleButton onClick={() => setAuthMode("email")}>Continue with Email</GoogleButton>
          </>
        ) : (
          <>
            <AuthForm />
            <OrDivider>
              <span>or</span>
            </OrDivider>
            <GoogleButton onClick={() => setAuthMode("google")}>Back to Google Login</GoogleButton>
          </>
        )}
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
