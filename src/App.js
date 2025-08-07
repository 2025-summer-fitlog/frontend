import ExerciseRecord from './components/ExerciseRecord';
import MemoInput from './components/MemoInput';
import FeedbackForm from './components/FeedbackForm';
import LogPage from './log/LogPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* 기본 루트("/")로 왔을 때 보여줄 컴포넌트들 */}
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

        {/* log 탭을 눌렀을 때 보여줄 페이지 */}
        <Route path="/log" element={<LogPage />} />
      </Routes>
    </Router>
  );
}

export default App;
