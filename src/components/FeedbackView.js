//  App.js에서 넘겨야 할 props:
// selectedDate: 오늘 날짜
// feedbackData: 응답 저장용
// setFeedbackData: 상태 갱신 함수

import React, { useEffect } from "react";

const FeedbackView = ({ selectedDate, feedbackData, setFeedbackData }) => {
  useEffect(() => {
    if (selectedDate) fetchFeedback(selectedDate);
  }, [selectedDate]);

  const fetchFeedback = async (date) => {
    try {
      const response = await fetch(`https://fitlog-2025.duckdns.org/api/log/daily/feedback/daily?date=${date}`);
      if (!response.ok) throw new Error("피드백 불러오기 실패");
      const data = await response.json();
      setFeedbackData(data);
    } catch (error) {
      console.error("[피드백 API 실패]", error);
    }
  };

  if (!feedbackData || !feedbackData.feedback) return null;

  return (
    <div className="feedback-box">
      <p className="feedback-grade">등급: {feedbackData.grade}</p>
      <p className="feedback-text">{feedbackData.feedback}</p>
    </div>
  );
};

export default FeedbackView;
