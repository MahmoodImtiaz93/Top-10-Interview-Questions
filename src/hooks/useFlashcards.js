import { useState, useEffect } from "react";
import { getQuestions } from "../services/api";

const useFlashcards = (subjectId) => {
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions(subjectId);
        setSubject(data.subject);
        setQuestions(data.questions || []);
        setLoading(false);
      } catch (error) {
        setError(error.message);
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

  return {
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
  };
};

export default useFlashcards;
