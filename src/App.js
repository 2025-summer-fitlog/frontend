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
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="/log" element={<LogPage />} />  
      </Routes>
    </Router>
  );
}

export default App;
