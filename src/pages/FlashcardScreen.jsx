import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import Container from '../components/common/Container';
import Loading from '../components/common/Loading';
import FlashcardCard from '../components/flashcards/FlashcardCard';
import FlashcardControls from '../components/flashcards/FlashcardControls';
import FlashcardProgress from '../components/flashcards/FlashcardProgress';
import useFlashcards from '../hooks/useFlashcards';

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

const FlashcardScreen = () => {
  const { subjectId } = useParams();
  const {
    subject,
    questions,
    currentIndex,
    flipped,
    loading,
    error,
    handleNext,
    handlePrev,
    handleFlip,
    handleReset,
  } = useFlashcards(subjectId);

  if (loading) {
    return <Loading message="Loading flashcards..." />;
  }

  if (error) {
    return (
      <Container>
        <Header>
          <BackButton to="/">
            <FiHome style={{ marginRight: '8px' }} /> Back to Subjects
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
            <FiHome style={{ marginRight: '8px' }} /> Back to Subjects
          </BackButton>
          <Title>{subject?.subject || 'No Questions'}</Title>
        </Header>
        <NoQuestionsContainer>
          No flashcards available for this subject.
        </NoQuestionsContainer>
      </Container>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Container>
      <Header>
        <BackButton to="/">
          <FiHome style={{ marginRight: '8px' }} /> Back to Subjects
        </BackButton>
        <Title>{subject?.subject}</Title>
        <Subtitle>
          Card {currentIndex + 1} of {questions.length}
        </Subtitle>
      </Header>

      <FlashcardCard
        question={currentQuestion.question}
        answer={currentQuestion.answer}
        flipped={flipped}
        onFlip={handleFlip}
      />

      <FlashcardControls
        onPrev={handlePrev}
        onNext={handleNext}
        onReset={handleReset}
        currentIndex={currentIndex}
        totalCards={questions.length}
      />

      <FlashcardProgress
        currentIndex={currentIndex}
        totalCards={questions.length}
      />
    </Container>
  );
};

export default FlashcardScreen; 