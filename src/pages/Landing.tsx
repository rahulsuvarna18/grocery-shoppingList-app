import styled from "styled-components";
import { ShoppingCart, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding: 64px 24px;
  }
`;

const HeroContent = styled.div`
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 24px;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 32px;
  line-height: 1.6;
`;

const Features = styled.div`
  margin-top: 48px;
  display: grid;
  gap: 24px;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.1rem;
  color: #4a5568;

  svg {
    color: #4caf50;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Landing() {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <HeroContent>
          <Title>Smart Grocery Shopping Made Simple</Title>
          <Subtitle>Organize your shopping lists, track inventory, and never forget an item again with our intelligent grocery management app.</Subtitle>
          <Button size="large" onClick={() => navigate("/login")}>
            Get Started <ArrowRight size={20} />
          </Button>

          <Features>
            <Feature>
              <CheckCircle size={24} />
              Create and share shopping lists
            </Feature>
            <Feature>
              <CheckCircle size={24} />
              Track your inventory automatically
            </Feature>
            <Feature>
              <CheckCircle size={24} />
              Smart suggestions based on your habits
            </Feature>
          </Features>
        </HeroContent>

        <ImageContainer>
          <ShoppingCart size={300} color="#4caf50" strokeWidth={1} />
        </ImageContainer>
      </Content>
    </Container>
  );
}
