import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubjectSelectionScreen from "./pages/SubjectSelectionScreen";
import FlashcardScreen from "./pages/FlashcardScreen";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubjectSelectionScreen />} />
        <Route path="/flashcards/:subjectId" element={<FlashcardScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
