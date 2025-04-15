import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiHome,
} from "react-icons/fi";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Montserrat", sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
`;

const BackButton = styled(Link)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  text-decoration: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;

  &:hover {
    color: #4776e6;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #ffffff;
`;

const CardContainer = styled.div`
  position: relative;
  height: 350px;
  margin-bottom: 2rem;
`;

const Card = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  padding: 2rem;
  background: ${(props) =>
    props.flipped
      ? "linear-gradient(135deg, #d7d2cc, #304352)"
      : "linear-gradient(155deg,rgb(235, 235, 235),rgb(145, 145, 145))"};
  color: ${(props) => (props.flipped ? "white" : "#333")};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  backface-visibility: hidden;
  text-align: center;
`;

const QuestionText = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #000000;
`;

const AnswerText = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  max-width: 90%;
  color: #000000;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background: rgb(0, 0, 0);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgb(58, 58, 58);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

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
  background: ${(props) => (props.active ? "#4776E6" : "#e9ecef")};
  margin: 0 3px;
  transition: all 0.3s ease;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
  background: #fdf2f2;
  border-radius: 8px;
  margin-top: 2rem;
`;

const NoQuestionsContainer = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.2rem;
  color: #666;
`;

function FlashcardScreen() {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://www.nuqilan.com/api/subjects/${subjectId}/questions`
        );
        setSubject(response.data.data.subject);
        setQuestions(response.data.data.questions || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to load questions.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [subjectId]);

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
    }, 200);
  };

  const handlePrev = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + questions.length) % questions.length
      );
    }, 200);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleReset = () => {
    setFlipped(false);
    setCurrentIndex(0);
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>Loading flashcards...</LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <BackButton to="/">
            <FiHome style={{ marginRight: "8px" }} /> Back to Subjects
          </BackButton>
          <Title>Error</Title>
        </Header>
        <ErrorContainer>{error}</ErrorContainer>
      </Container>
    );
  }

  if (questions.length === 0) {
    return (
      <Container>
        <Header>
          <BackButton to="/">
            <FiHome style={{ marginRight: "8px" }} /> Back to Subjects
          </BackButton>
          <Title>{subject}</Title>
        </Header>
        <NoQuestionsContainer>
          No flashcards available for this subject. Please choose another
          subject.
        </NoQuestionsContainer>
      </Container>
    );
  }

  const currentCard = questions[currentIndex];

  return (
    <Container>
      <Header>
        <BackButton to="/">
          <FiHome style={{ marginRight: "8px" }} /> Back to Subjects
        </BackButton>
        <Title>{subject} Flashcards</Title>
        <Subtitle>Flip the card to reveal the answer</Subtitle>
      </Header>

      <CardContainer>
        <AnimatePresence mode="wait">
          <Card
            key={`${currentIndex}-${flipped}`}
            flipped={flipped}
            onClick={handleFlip}
            initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {flipped ? (
              <AnswerText>{currentCard.answer}</AnswerText>
            ) : (
              <QuestionText>{currentCard.question}</QuestionText>
            )}
          </Card>
        </AnimatePresence>
      </CardContainer>

      <Controls>
        <Button onClick={handlePrev} disabled={questions.length <= 1}>
          <FiChevronLeft /> Previous
        </Button>
        <Button onClick={handleFlip}>
          {flipped ? "Show Question" : "Show Answer"}
        </Button>
        <Button onClick={handleNext} disabled={questions.length <= 1}>
          Next <FiChevronRight />
        </Button>
        <Button onClick={handleReset}>
          <FiRefreshCw /> Reset
        </Button>
      </Controls>

      <Progress>
        {questions.map((_, index) => (
          <ProgressDot key={index} active={index === currentIndex} />
        ))}
      </Progress>
    </Container>
  );
}

export default FlashcardScreen;
