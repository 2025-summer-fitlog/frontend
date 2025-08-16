import React, { useEffect, useMemo, useRef } from "react";
import Chart from "chart.js/auto";

const getScore = (s) => (s === "O" ? 100 : s === "△" ? 50 : 0);

const centerTextPlugin = {
  id: "centerText",
  afterDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chart.config._scoreText) return;

    const text = chart.config._scoreText;
    const { left, right, top, bottom } = chartArea;
    const x = (left + right) / 2;
    const y = (top + bottom) / 2;

    ctx.save();
    ctx.fillStyle = "#000";
    ctx.font = "bold 20px Pretendard, -apple-system, system-ui, Segoe UI, Roboto, 'Noto Sans KR', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
    ctx.restore();
  },
};

Chart.register(centerTextPlugin);

export default function DailyView({ dateStr, record = {}  }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const symbols = Array.isArray(record.symbols) ? record.symbols : [];
  const score = useMemo(() => {
    if (!symbols.length) return 0;
    return Math.round(symbols.reduce((sum, s) => sum + getScore(s), 0) / symbols.length);
  }, [symbols]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["점수", "빈칸"],
        datasets: [
          {
            data: [score, 100 - score],
            backgroundColor: ["#9ADBF6", "#eee"],
            borderColor: ["#9ADBF6", "#eee"],
            borderWidth: 0,
            hoverBackgroundColor: ["#9ADBF6", "#eee"],
            hoverBorderColor: ["#9ADBF6", "#eee"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        animation: {
          duration: 400,
        },
      },
    });

    chart.config._scoreText = `${score}점`;

    chartRef.current = chart;

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [score]);

  return (
    <div className="tab-content active" id="today">
      <div className="date" style={{ display: "none" }}>{dateStr}</div>
      <div className="circle" style={{ position: "relative" }}>
        <div style={{ width: 420, height: 420 }}>
          <canvas id="circleChart" ref={canvasRef} />
        </div>
      </div>
    </div>
  );
}
