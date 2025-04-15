import styled from 'styled-components';
import Container from '../components/common/Container';
import Loading from '../components/common/Loading';
import SubjectsGrid from '../components/subjects/SubjectsGrid';
import useSubjects from '../hooks/useSubjects';

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-family: "Montserrat", sans-serif;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgb(185, 185, 185);
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
  background: #fdf2f2;
  border-radius: 8px;
  margin-top: 2rem;
`;

const SubjectSelectionScreen = () => {
  const { subjects, loading, error } = useSubjects();

  if (loading) {
    return <Loading message="Loading available subjects..." />;
  }

  if (error) {
    return (
      <Container>
        <Header>
          <Title>Error</Title>
        </Header>
        <ErrorContainer>{error}</ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Choose a Flashcard Topic</Title>
        <Subtitle>Select a subject to start practicing with flashcards</Subtitle>
      </Header>
      <SubjectsGrid subjects={subjects} />
    </Container>
  );
};

export default SubjectSelectionScreen; 