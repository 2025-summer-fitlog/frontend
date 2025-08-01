import { useState } from "react";

function ExerciseRecord() {
  const [selected, setSelected] = useState(""); // ○, △, ✕

  const handleClick = (mark) => {
    setSelected(mark);
  };

  return (
    <div>
      <h2>2025년 7월 19일</h2>
      <p style={{ fontSize: "1.2rem" }}>
        운동 수행 기록:{" "}
        {["O", "△", "X"].map((mark) => (
          <button
            key={mark}
            onClick={() => handleClick(mark)}
            style={{
              color: selected === mark ? "#FFD400" : "black", // 선택된 기호만 노란색
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            {mark}
          </button>
        ))}
      </p>
    </div>
  );
}

export default ExerciseRecord;
