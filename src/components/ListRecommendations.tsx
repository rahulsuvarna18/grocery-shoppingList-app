import React from "react";
import styled from "styled-components";
import { Sparkles } from "lucide-react";
import useCreateGroceryList from "../services/Mutations/useCreateGroceryList";
import Modal from "../ui/Modal/Modal";
import LoadingSpinner from "../ui/LoadingSpinner";

const RecommendationsSection = styled.div`
  margin-top: 48px;
  width: 100%;
  max-width: 1200px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: #f59e0b;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
`;

const RecommendationCard = styled.button`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-color: #4caf50;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 600;
  margin: 0;
`;

const CardIcon = styled.div`
  font-size: 24px;
`;

const LoadingText = styled.p`
  color: #666;
  margin-top: 12px;
  font-size: 0.9rem;
`;

const recommendationsList = [
  { title: "Your Next Party", emoji: "🎉" },
  { title: "Groceries", emoji: "🥑" },
  { title: "Clothes", emoji: "👕" },
  { title: "Holiday", emoji: "🏖️" },
  { title: "Drugstore", emoji: "💊" },
];

const ListRecommendations = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedTitle, setSelectedTitle] = React.useState("");
  const { createGroceryList, isCreating } = useCreateGroceryList();

  const handleCardClick = (title: string) => {
    setSelectedTitle(title);
    setIsModalOpen(true);

    // Simulate creation after a delay
    setTimeout(() => {
      createGroceryList({ name: title, color: "#000000" });
      setIsModalOpen(false);
    }, 900);
  };

  return (
    <RecommendationsSection>
      <Title>
        <Sparkles size={24} />
        Recommended Lists
      </Title>
      <CardsContainer>
        {recommendationsList.map((item) => (
          <RecommendationCard key={item.title} onClick={() => handleCardClick(item.title)} disabled={isCreating}>
            <CardIcon>{item.emoji}</CardIcon>
            <CardTitle>{item.title}</CardTitle>
          </RecommendationCard>
        ))}
      </CardsContainer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Content>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <LoadingSpinnerWrapper>
              <LoadingSpinner />
            </LoadingSpinnerWrapper>
            <LoadingText>
              Creating your {selectedTitle} list...
              <br />
              Just a moment please!
            </LoadingText>
          </div>
        </Modal.Content>
      </Modal>
    </RecommendationsSection>
  );
};

const LoadingSpinnerWrapper = styled.div`
  margin: 20px 0;
`;

export default ListRecommendations;
