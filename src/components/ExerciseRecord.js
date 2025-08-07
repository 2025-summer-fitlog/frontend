import { useState, useEffect } from "react";

function ExerciseRecord() {
  const [selected, setSelected] = useState(localStorage.getItem("selectedMark") || "");

  const handleClick = (mark) => {
    setSelected(mark);
    localStorage.setItem("selectedMark", mark); // 선택 상태를 저장
  };

  useEffect(() => {
    // 페이지 새로고침 시에도 선택된 값 유지
    const saved = localStorage.getItem("selectedMark");
    if (saved) setSelected(saved);
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>2025년 7월 19일</h2>
      <p style={{ fontSize: "1.2rem" }}>
        운동 수행 기록:{" "}
        {["O", "△", "X"].map((mark) => (
          <button
            key={mark}
            onClick={() => handleClick(mark)}
            style={{
              color: selected === mark ? "#FFD400" : "black",
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
