// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExerciseRecord from './components/ExerciseRecord';
import MemoInput from './components/MemoInput';
import Header from './components/Header'; 
import Home from './pages/Home';

function LogPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>FitLog</h1>
      <ExerciseRecord />
      <MemoInput />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header />  {/* 항상 상단에 고정 */}
      <Routes>
        <Route path="/" element={<Home />} />         {/* 홈 페이지 */}
        <Route path="/log" element={<LogPage />} />   {/* 오늘의 운동 기록 페이지 */}
      </Routes>
    </Router>
  );
}

export default App;
