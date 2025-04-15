import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight, FiRefreshCw } from 'react-icons/fi';
import Button from '../common/Button';

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FlashcardControls = ({ onPrev, onNext, onReset, currentIndex, totalCards }) => {
  return (
    <Controls>
      <Button onClick={onPrev} disabled={totalCards === 0}>
        <FiChevronLeft /> Previous
      </Button>
      <Button onClick={onNext} disabled={totalCards === 0}>
        Next <FiChevronRight />
      </Button>
      <Button onClick={onReset} disabled={totalCards === 0 || currentIndex === 0}>
        <FiRefreshCw /> Reset
      </Button>
    </Controls>
  );
};

export default FlashcardControls; 