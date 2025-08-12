import ExerciseRecord from './components/ExerciseRecord';
import MemoInput from './components/MemoInput';
import FeedbackForm from './components/FeedbackForm';
// import LogPage from './log/LogPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ padding: "2rem" }}>
              <h1>FitLog - 오늘의 운동 기록</h1>
              <ExerciseRecord />
              <MemoInput />
            </div>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
