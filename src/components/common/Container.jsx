import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Montserrat", sans-serif;
`;

const Container = ({ children, ...props }) => {
  return <StyledContainer {...props}>{children}</StyledContainer>;
};

export default Container; 