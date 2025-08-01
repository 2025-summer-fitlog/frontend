// MemoInput.js
import { useState } from "react";

function MemoInput() {
  const [memo, setMemo] = useState("");

  const handleSave = () => {
    if (memo.trim() === "") {
      alert("메모를 입력해주세요.");
      return;
    }

    console.log("저장된 메모:", memo);
    alert("저장 완료!");
    // 나중에 로컬스토리지나 서버로 저장 가능!
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>메모</h3>
      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="오늘 운동에 대한 메모를 입력하세요. "
        rows={4}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "10px",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <br />
      <button
        onClick={handleSave}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          fontSize: "1rem",
          backgroundColor: "#FFD400",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        저장
      </button>
    </div>
  );
}

export default MemoInput;
