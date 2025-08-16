import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { addDays, dateKeyLocal } from "../utils/date";
import { getScore } from "../utils/score";

export default function WeeklyView({ weekStart, onWeekChange, records, onSelectDate }) {
  const canvasRef = useRef(null);
  const start = new Date(weekStart);

  const labels = [];
  const scores = [];
  for (let i = 0; i < 7; i++) {
    const d = addDays(start, i);
    const key = dateKeyLocal(d);
    labels.push(`${d.getMonth() + 1}.${d.getDate()}`);

    const r = records[key];
    const score =
      r && Array.isArray(r.symbols) && r.symbols.length
        ? r.symbols.reduce((s, v) => s + getScore(v), 0) / r.symbols.length
        : 0;
    scores.push(Math.round(score));
  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "이번 주 평균 점수",
            data: scores,
          },
        ],
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true, max: 100 } },
        onClick: (_, elements) => {
          if (elements.length > 0) {
            const idx = elements[0].index;
            const clicked = addDays(start, idx);
            onSelectDate(dateKeyLocal(clicked));
          }
        },
      },
    });
    return () => chart.destroy();
  }, [weekStart, JSON.stringify(records)]);

  const end = addDays(start, 6);

  return (
    <div className="tab-content active" id="week">
      <div
        id="weekly-header-wrapper"
        style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 36, marginBottom: 30, marginTop: 10 }}
      >
        <button className="arrow-btn" onClick={() => onWeekChange(-1)}>
          ◀
        </button>
        <div id="weekly-header" className="tab-date">
          {`${start.getMonth() + 1}.${start.getDate()} ~ ${end.getMonth() + 1}.${end.getDate()}`}
        </div>
        <button className="arrow-btn" onClick={() => onWeekChange(1)}>
          ▶
        </button>
      </div>
      <canvas id="weeklyChart" ref={canvasRef} />
    </div>
  );
}
