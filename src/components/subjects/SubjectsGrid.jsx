import styled from 'styled-components';
import SubjectCard from './SubjectCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SubjectsGrid = ({ subjects }) => {
  return (
    <Grid>
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} {...subject} />
      ))}
    </Grid>
  );
};

export default SubjectsGrid; 