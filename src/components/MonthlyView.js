import React, { useMemo } from "react";
import { getColorByScore } from "../utils/score";

export default function MonthlyView({ currentMonth, onMonthChange, records, onSelectDate }) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const { weeks } = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i=0; i<firstDay; i++) cells.push(null);
    for (let d=1; d<=lastDate; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    const weeks = [];
    for (let i=0; i<cells.length; i+=7) weeks.push(cells.slice(i, i+7));
    return { weeks };
  }, [year, month]);

  return (
    <div className="tab-content active" id="month">
      <div id="monthly-header-wrapper" style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:36, marginBottom:30, marginTop:10 }}>
        <button className="arrow-btn" onClick={() => onMonthChange(-1)}>◀</button>
        <div id="monthly-header" className="tab-date">{`${year}.${month+1}`}</div>
        <button className="arrow-btn" onClick={() => onMonthChange(1)}>▶</button>
      </div>
      <table className="monthly"><tbody id="monthly-body">
        {weeks.map((w, wi) => (
          <tr key={wi}>
            {w.map((d, di) => {
              if (!d) return <td key={di} />;
              const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
              const record = records[dateStr];
              let bg = "#FFFFFF";
              if (record && Array.isArray(record.symbols) && record.symbols.length > 0) {
                const score = record.symbols.reduce((s,v) => s + (v==="O"?100:v==="△"?50:0), 0) / record.symbols.length;
                bg = getColorByScore(score);
              }
              return (
                <td key={di} style={{ backgroundColor: bg }} onClick={() => onSelectDate(dateStr)}>
                  {d}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody></table>
    </div>
  );
}
