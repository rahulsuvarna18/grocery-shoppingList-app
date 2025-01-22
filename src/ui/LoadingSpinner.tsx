import styled, { keyframes } from "styled-components";

const LoadingSpinner = () => {
  return (
    <SpinnerWrapper>
      <SpinnerContainer>
        <Dot $delay="0s" />
        <Dot $delay="0.1s" />
        <Dot $delay="0.2s" />
      </SpinnerContainer>
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.3;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Dot = styled.div<{ $delay: string }>`
  width: 12px;
  height: 12px;
  background-color: #4caf50;
  border-radius: 50%;
  display: inline-block;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${props => props.$delay};
`;
