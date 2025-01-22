import React from 'react';
import styled from 'styled-components';
import supabase from '../services/supabase';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LoginCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 24px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/app`
        }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Welcome to Grocery App</Title>
        <GoogleButton onClick={handleGoogleLogin}>
          <img src="/google-icon.svg" alt="Google" width="20" height="20" />
          Sign in with Google
        </GoogleButton>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login; 