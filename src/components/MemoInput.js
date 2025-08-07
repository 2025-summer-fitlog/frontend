import React, { useState } from "react";

const handleWorkoutChange = (index, field, value) => {
  const updated = [...workouts];
    updated[index][field] = value;
    setWorkouts(updated);
};

const MemoInput = ({ onSave }) => {
  const [workouts, setWorkouts] = useState([{ name: "", status: "" }]);
  const [memo, setMemo] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleAddWorkout = () => {
    setWorkouts([...workouts, { name: "", status: "" }]);
  };

  const handleWorkoutChange = (index, field, value) => {
    const updated = [...workouts];
    updated[index][field] = value;
    setWorkouts(updated);
  };

  const handlePhotoChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleSubmit = () => {
    if (workouts.some(w => !w.name)) {
      alert("운동 이름을 모두 입력해 주세요!");
      return;
    }
    const data = {
      date: new Date().toISOString().split("T")[0],
      memo,
      workouts,
      photos,
    };
    onSave(data);
  };

  return (
    <div id="memo-section">
      <h2>오늘의 운동 기록</h2>

      {workouts.map((w, i) => (
        <div key={i} className="workout-row">
          <input
            type="text"
            placeholder="운동 이름"
            value={w.name}
            onChange={(e) => handleWorkoutChange(i, "name", e.target.value)}
          />
          {["○", "△", "×"].map((symbol) => (
            <button
              key={symbol}
              className={w.status === symbol ? "selected" : ""}
              onClick={() => handleWorkoutChange(i, "status", symbol)}
            >
              {symbol}
            </button>
          ))}
        </div>
      ))}

      <button onClick={handleAddWorkout}>운동 줄 추가</button>

      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="오늘의 메모를 입력하세요"
      />

      <input type="file" multiple onChange={handlePhotoChange} />

      <div className="button-row">
        <button onClick={handleSubmit}>저장</button>
      </div>
    </div>
  );
};

export default MemoInput;
