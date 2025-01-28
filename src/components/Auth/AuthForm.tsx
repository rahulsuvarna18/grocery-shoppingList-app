import { useState } from "react";
import styled from "styled-components";
import supabase from "../../services/supabase";
import { useAuth } from "../../context/AuthContext";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const Button = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
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

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 14px;
  margin: 0;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #4caf50;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  text-decoration: underline;

  &:hover {
    color: #45a049;
  }
`;

interface AuthFormProps {
  isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin = true }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">(isLogin ? "login" : "signup");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (mode === "signup") {
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });

        if (signUpError) throw signUpError;
        if (!authData.user) throw new Error("Signup successful but user data is missing");

        // Create initial user metadata
        const { error: metadataError } = await supabase.from("user_metadata").insert({
          user_id: authData.user.id,
          full_name: name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          auth_provider: "email",
        });

        if (metadataError) {
          console.error("Error creating user metadata:", metadataError);
          throw metadataError;
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {mode === "signup" && <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />}

      <Input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Please wait..." : mode === "login" ? "Log In" : "Sign Up"}
      </Button>

      <ToggleButton type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
        {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Log in"}
      </ToggleButton>
    </Form>
  );
};

export default AuthForm;
