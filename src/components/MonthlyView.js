import React, { useEffect, useState } from "react";

const MonthlyView = ({ selectedDate, monthlyData, setMonthlyData }) => {
  const [baseDate, setBaseDate] = useState(new Date(selectedDate));
  const [monthLabel, setMonthLabel] = useState("");

  useEffect(() => {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth() + 1;
    setMonthLabel(`${year}년 ${month}월`);
    fetchMonthlyData(year, month);
  }, [baseDate]);

  const fetchMonthlyData = async (year, month) => {
    try {
      const response = await fetch(
        `https://fitlog-2025.duckdns.org/api/log/daily/monthly?year=${year}&month=${month}`
      );
      if (!response.ok) throw new Error("월별 데이터 불러오기 실패");
      const data = await response.json();
      setMonthlyData(data);
      setTimeout(() => updateCalendarWithScores(data), 0); // DOM 렌더 후 적용
    } catch (error) {
      console.error("[월별 기록 불러오기 실패]", error);
    }
  };

  const updateCalendarWithScores = (data) => {
    const calendarCells = document.querySelectorAll(".calendar-day");
    calendarCells.forEach((cell) => {
      const day = cell.getAttribute("data-day");
      const entry = data.find((d) => d.day === parseInt(day));
      if (!entry) {
        cell.style.backgroundColor = "white";
        return;
      }

      const score = entry.averageScore;
      if (score === 0) {
        cell.style.backgroundColor = "white";
      } else if (score < 30) {
        cell.style.backgroundColor = "#E1F3FC";
      } else if (score < 50) {
        cell.style.backgroundColor = "#BCE7FA";
      } else if (score < 70) {
        cell.style.backgroundColor = "#9ADBF6";
      } else if (score < 90) {
        cell.style.backgroundColor = "#58C7F1";
      } else {
        cell.style.backgroundColor = "#0C9EF9";
      }
    });
  };

  const handlePrevMonth = () => {
    const newDate = new Date(baseDate);
    newDate.setMonth(baseDate.getMonth() - 1);
    setBaseDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(baseDate);
    newDate.setMonth(baseDate.getMonth() + 1);
    setBaseDate(newDate);
  };

  const generateCalendarCells = () => {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }

    for (let day = 1; day <= lastDate; day++) {
      cells.push(
        <div key={`day-${day}`} className="calendar-day" data-day={day}>
          {day}
        </div>
      );
    }

    return cells;
  };

  return (
    <div>
      <div style={{ textAlign: "center", fontSize: "24px", marginBottom: "10px" }}>
        <button onClick={handlePrevMonth}>←</button>
        <span style={{ margin: "0 20px" }}>{monthLabel}</span>
        <button onClick={handleNextMonth}>→</button>
      </div>
      <div id="monthly-calendar" className="calendar-grid">
        {generateCalendarCells()}
      </div>
    </div>
  );
};

export default MonthlyView;
