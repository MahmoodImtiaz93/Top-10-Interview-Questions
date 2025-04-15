import styled from 'styled-components';
import Container from './Container';

const LoadingContainer = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const Loading = ({ message = 'Loading...' }) => {
  return (
    <Container>
      <LoadingContainer>{message}</LoadingContainer>
    </Container>
  );
};

export default Loading; 