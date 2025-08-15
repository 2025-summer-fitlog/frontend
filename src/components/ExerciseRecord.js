import React, { useEffect, useRef, useState } from "react";

export default function ExerciseRecord({ lines, onChange }) {
  const [showDelete, setShowDelete] = useState({});
  const timersRef = useRef({});      

  const updateLine = (idx, patch) => {
    onChange(lines.map((l, i) => (i === idx ? { ...l, ...patch } : l)));
  };

  const removeLine = (idx) => {
    onChange(lines.filter((_, i) => i !== idx));
    clearTimer(idx);
    setShowDelete((prev) => ({ ...prev, [idx]: false }));
  };

  const clearTimer = (idx) => {
    if (timersRef.current[idx]) {
      clearTimeout(timersRef.current[idx]);
      delete timersRef.current[idx];
    }
  };

  const handleEnter = (idx) => {
    clearTimer(idx);
    timersRef.current[idx] = setTimeout(() => {
      setShowDelete((prev) => ({ ...prev, [idx]: true }));
    }, 1000);
  };

  const handleLeave = (idx) => {
    clearTimer(idx);
    setShowDelete((prev) => ({ ...prev, [idx]: false }));
  };

  useEffect(() => {
    Object.keys(timersRef.current).forEach((k) => {
      const i = Number(k);
      if (i >= lines.length) {
        clearTimer(i);
      }
    });
  }, [lines.length]);

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((t) => clearTimeout(t));
      timersRef.current = {};
    };
  }, []);

  return (
    <ul id="log-list">
      {lines.map((line, idx) => {
        const show = !!showDelete[idx];
        return (
          <li
            key={idx}
            className="record-line"
            style={{ position: "relative", display: "flex", alignItems: "center", cursor: "default" }}
            onMouseEnter={() => handleEnter(idx)}
            onMouseLeave={() => handleLeave(idx)}
          >
            {!show ? (
              <span className="line-icon" style={{ marginRight: 8 }}>•</span>
            ) : (
              <button
                type="button"
                className="line-delete-btn"
                onClick={() => removeLine(idx)}
              >
                삭제
              </button>
            )}

            <input
              type="text"
              className="record-text"
              placeholder="오늘의 운동 계획"
              value={line.text}
              onChange={(e) => updateLine(idx, { text: e.target.value })}
              style={{ flex: 1, fontSize: "18px", border: "none", outline: "none", background: "none" }}
              onFocus={() => handleEnter(idx)}
              onBlur={() => handleLeave(idx)}
            />

            <span className="record-options" data-index={idx}>
              {["O", "△", "X"].map((sym) => (
                <span
                  key={sym}
                  className={line.symbol === sym ? "selected" : ""}
                  onClick={() => updateLine(idx, { symbol: sym })}
                >
                  {sym}
                </span>
              ))}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
