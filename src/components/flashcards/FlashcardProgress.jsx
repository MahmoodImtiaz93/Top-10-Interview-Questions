import styled from 'styled-components';

const Progress = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
  gap: 8px;
`;

const ProgressDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => (props.$active ? "#4776E6" : "#e9ecef")};
  margin: 0 3px;
  transition: all 0.3s ease;
`;

const FlashcardProgress = ({ currentIndex, totalCards }) => {
  return (
    <Progress>
      {Array.from({ length: totalCards }).map((_, index) => (
        <ProgressDot key={index} $active={index === currentIndex} />
      ))}
    </Progress>
  );
};

export default FlashcardProgress; 