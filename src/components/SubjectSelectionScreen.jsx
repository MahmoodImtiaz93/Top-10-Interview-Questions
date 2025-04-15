import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Inter", sans-serif;
`;

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

const SubjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SubjectCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

const SubjectTitle = styled.h2`
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 1rem;
`;

const SubjectIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #141e30; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #243b55,
    #141e30
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #243b55,
    #141e30
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  color: white;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 3rem;
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

function SubjectSelectionScreen() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("https://www.nuqilan.com/api/subjects");
        setSubjects(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setError("Failed to load subjects.");
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>Flashcard Topics</Title>
        </Header>
        <LoadingContainer>Loading available subjects...</LoadingContainer>
      </Container>
    );
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

  // Get the first letter of the subject for the icon
  const getInitial = (subject) => {
    return subject.charAt(0).toUpperCase();
  };

  return (
    <Container>
      <Header>
        <Title>Choose a Flashcard Topic</Title>
        <Subtitle>
          Select a subject to start practicing with flashcards
        </Subtitle>
      </Header>

      <SubjectsGrid>
        {subjects.map((subject) => (
          <Link
            to={`/flashcards/${subject.id}`}
            key={subject.id}
            style={{ textDecoration: "none" }}
          >
            <SubjectCard
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <SubjectIcon>{getInitial(subject.subject)}</SubjectIcon>
              <SubjectTitle>{subject.subject}</SubjectTitle>
            </SubjectCard>
          </Link>
        ))}
      </SubjectsGrid>
    </Container>
  );
}

export default SubjectSelectionScreen;
