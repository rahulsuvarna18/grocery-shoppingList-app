import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px 24px;
  background-color: #f8fafc;
  border-radius: 12px;
  width: 100%;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  color: #333;
  margin: 0;
`;

export const Text = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  margin: 0;
`;

export const Icon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #f0fdf4;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4caf50;
`;