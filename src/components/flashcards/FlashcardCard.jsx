import styled from 'styled-components';
import { motion } from 'framer-motion';

const CardContainer = styled.div`
  position: relative;
  height: 350px;
  margin-bottom: 2rem;
  perspective: 1200px;
  width: 100%;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${props => props.$flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
  cursor: pointer;
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const CardFront = styled(CardFace)`
  background: linear-gradient(155deg, rgb(235, 235, 235), rgb(145, 145, 145));
`;

const CardBack = styled(CardFace)`
  background: linear-gradient(135deg, #d7d2cc, #304352);
  transform: rotateY(180deg);
`;

const QuestionText = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #000000;
  font-family: "Montserrat", sans-serif;
`;

const AnswerText = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  max-width: 90%;
  color:rgb(255, 250, 250);
   font-family: "Montserrat", sans-serif;
`;

const FlashcardCard = ({ question, answer, flipped, onFlip }) => {
  return (
    <CardContainer>
      <CardInner $flipped={flipped} onClick={onFlip}>
        <CardFront>
          <QuestionText>{question}</QuestionText>
        </CardFront>
        <CardBack>
          <AnswerText>{answer}</AnswerText>
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};

export default FlashcardCard; 