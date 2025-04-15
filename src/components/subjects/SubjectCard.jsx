import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Card = styled(motion.div)`
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
  background: #141e30;
  background: linear-gradient(to right, #243b55, #141e30);
  color: white;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
`;

const SubjectCard = ({ id, subject }) => {
  const getInitial = (text) => text.charAt(0).toUpperCase();

  return (
    <Link to={`/flashcards/${id}`} style={{ textDecoration: 'none' }}>
      <Card whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <SubjectIcon>{getInitial(subject)}</SubjectIcon>
        <SubjectTitle>{subject}</SubjectTitle>
      </Card>
    </Link>
  );
};

export default SubjectCard; 