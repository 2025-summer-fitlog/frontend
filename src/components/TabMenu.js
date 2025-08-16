import React from "react";

export default function TabMenu({ tab, onChange }) {
  return (
    <div className="menu">
      <button
        className={`tab-btn ${tab === "today" ? "active" : ""}`}
        onClick={() => onChange("today")}
      >
        오늘
      </button>
      <button
        className={`tab-btn ${tab === "week" ? "active" : ""}`}
        onClick={() => onChange("week")}
      >
        주간
      </button>
      <button
        className={`tab-btn ${tab === "month" ? "active" : ""}`}
        onClick={() => onChange("month")}
      >
        월별
      </button>
    </div>
  );
}
