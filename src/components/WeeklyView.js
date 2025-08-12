import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const WeeklyView = ({ selectedDate, weeklyData, setWeeklyData }) => {
  const [weekRange, setWeekRange] = useState("");
  const [baseDate, setBaseDate] = useState(new Date(selectedDate));

  useEffect(() => {
    const formattedDate = baseDate.toISOString().split("T")[0];
    fetchWeeklyData(formattedDate);
    updateWeekRange(baseDate);
  }, [baseDate]);

  const fetchWeeklyData = async (date) => {
    try {
      const response = await fetch(`https://fitlog-2025.duckdns.org/api/log/daily/weekly?date=${date}`);
      if (!response.ok) throw new Error("주간 데이터 불러오기 실패");
      const data = await response.json();
      setWeeklyData(data);
      drawWeeklyBarChart(data);
    } catch (error) {
      console.error("[주간 기록 불러오기 실패]", error);
    }
  };

  const updateWeekRange = (dateObj) => {
    const day = dateObj.getDay(); // 0(일) ~ 6(토)
    const sunday = new Date(dateObj);
    sunday.setDate(dateObj.getDate() - day);
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);

    const format = (d) => `${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
    setWeekRange(`${format(sunday)} ~ ${format(saturday)}`);
  };

  const drawWeeklyBarChart = (data) => {
    const ctx = document.getElementById("weeklyChart");
    if (!ctx) return;
    if (Chart.getChart(ctx)) Chart.getChart(ctx).destroy();

    const labels = data.map((entry) => entry.date);
    const scores = data.map((entry) => entry.averageScore);

    new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "평균 점수",
            data: scores,
            backgroundColor: "#9ADBF6",
            borderRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });
  };

  const handlePrevWeek = () => {
    const newDate = new Date(baseDate);
    newDate.setDate(baseDate.getDate() - 7);
    setBaseDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(baseDate);
    newDate.setDate(baseDate.getDate() + 7);
    setBaseDate(newDate);
  };

  return (
    <div>
      <div style={{ textAlign: "center", fontSize: "24px", marginBottom: "10px" }}>
        <button onClick={handlePrevWeek}>←</button>
        <span style={{ margin: "0 20px" }}>{weekRange}</span>
        <button onClick={handleNextWeek}>→</button>
      </div>
      <div className="graph-container">
        <canvas id="weeklyChart" width="600" height="300"></canvas>
      </div>
    </div>
  );
};

export default WeeklyView;
