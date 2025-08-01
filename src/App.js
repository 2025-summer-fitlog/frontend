import ExerciseRecord from './components/ExerciseRecord';
import MemoInput from './components/MemoInput';
import FeedbackForm from "./components/FeedbackForm";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>FitLog - 오늘의 운동 기록</h1>
      <ExerciseRecord />
      <MemoInput />
    </div>
  );
}

export default App;
