import React from "react";

function SaveButton() {
  const handleSave = async () => {
    const mark = localStorage.getItem("selectedMark");
    const memo = localStorage.getItem("dailyMemo");

    if (!mark || !memo) {
      alert("운동 기록과 메모를 모두 입력해 주세요.");
      return;
    }

    const score = mark === "O" ? 100 : mark === "△" ? 50 : 0;

    const requestBody = {
      date: "2025-07-19",
      mark,
      memo,
      score,
    };

    try {
      const response = await fetch("https://fitlog-2025.duckdns.org/api/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      alert("기록이 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("기록 저장 실패:", error);
      alert("기록 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <button
      onClick={handleSave}
      style={{
        padding: "12px 40px",
        fontSize: "1.1rem",
        backgroundColor: "#9ADBF6",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
      }}
    >
      저장하기
    </button>
  );
}

export default SaveButton;
