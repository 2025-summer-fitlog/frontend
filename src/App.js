// src/App.js
import React, { useMemo, useState, useEffect } from "react";
import TabMenu from "./components/TabMenu";
import DailyView from "./components/DailyView";
import WeeklyView from "./components/WeeklyView";
import MonthlyView from "./components/MonthlyView";
import RecordEditor from "./components/RecordEditor";
import FeedbackView from "./components/FeedbackView";
import { getTodayStr, formatDot, addDays, startOfWeekISO } from "./utils/date";
import { getMainFeedback, getConditionalFeedback } from "./utils/feedback";
import { loadAll, saveAll } from "./utils/storage";

import Header from "./components/Header";

const TABS = { TODAY: "today", WEEK: "week", MONTH: "month" };

// 오늘 기록에 “내용이 있는지” 판별 (줄/기호/메모/이미지 중 하나라도 있으면 true)
const hasContent = (r) => {
  if (!r) return false;
  const hasLines = Array.isArray(r.texts) && r.texts.length > 0;
  const hasSymbols = Array.isArray(r.symbols) && r.symbols.length > 0;
  const hasMemo = (r.memo || "").trim().length > 0;
  const hasImages = Array.isArray(r.img) && r.img.length > 0;
  return hasLines || hasSymbols || hasMemo || hasImages;
};

export default function App() {
  const today = useMemo(() => getTodayStr(), []);
  const [tab, setTab] = useState(TABS.TODAY);

  const [records, setRecords] = useState({});
  const [selectedDate, setSelectedDate] = useState(today);

  const [weekStart, setWeekStart] = useState(startOfWeekISO(new Date()));
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 저장 후에만 피드백이 제공되도록
  const [showFeedbackToday, setShowFeedbackToday] = useState(false);

  useEffect(() => {
    const loaded = loadAll();
    setRecords(loaded);
    setShowFeedbackToday(hasContent(loaded[today]));
  }, [today]);

  const upsertRecord = (dateStr, payload) => {
    setRecords((prev) => {
      const next = { ...prev, [dateStr]: payload };
      saveAll(next);
      return next;
    });
    if (dateStr === today) {
      setShowFeedbackToday(hasContent(payload));
    }
  };

  const removeRecord = (dateStr) => {
    setRecords((prev) => {
      const next = { ...prev };
      delete next[dateStr];
      saveAll(next);
      return next;
    });
    // 오늘 기록 삭제 시 피드백 함께 삭제
    if (dateStr === today) {
      setShowFeedbackToday(false);
    }
  };

  const scoreForDate = (dateStr) => {
    const r = records[dateStr];
    if (!r || !Array.isArray(r.symbols) || r.symbols.length === 0) return 0;
    const score =
      r.symbols.reduce((s, v) => s + (v === "O" ? 100 : v === "△" ? 50 : 0), 0) / r.symbols.length;
    return Math.round(score);
  };

  const mainFeedback = getMainFeedback(scoreForDate(today));
  const extraFeedback = getConditionalFeedback(records, today);

  useEffect(() => {
    if (tab === TABS.TODAY) setSelectedDate(today);
  }, [tab, today]);

  return (
    <div className="page">
      <Header />
      <div className="container">
        <div className="left">
          <TabMenu tab={tab} onChange={setTab} />

          {tab === TABS.TODAY && (
            <DailyView
              dateStr={today}
              record={records[today]}
              onScoreNeedsSave={(payload) => upsertRecord(today, payload)}
            />
          )}

          {tab === TABS.WEEK && (
            <WeeklyView
              weekStart={weekStart}
              onWeekChange={(delta) => setWeekStart(addDays(weekStart, delta * 7))}
              records={records}
              onSelectDate={(d) => {
                setSelectedDate(d);
              }}
            />
          )}

          {tab === TABS.MONTH && (
            <MonthlyView
              currentMonth={currentMonth}
              onMonthChange={(delta) => {
                const m = new Date(currentMonth);
                m.setMonth(m.getMonth() + delta);
                setCurrentMonth(m);
              }}
              records={records}
              onSelectDate={(d) => {
                setSelectedDate(d);
              }}
            />
          )}
        </div>
        <div className="right">
          <h2 id="log-date">
            {selectedDate === today ? "오늘의 기록" : `과거의 기록 ${formatDot(selectedDate)}`}
          </h2>

          <RecordEditor
            dateStr={selectedDate}
            isToday={selectedDate === today}
            record={records[selectedDate]}
            onSave={(payload) => upsertRecord(selectedDate, payload)}
            onDelete={() => removeRecord(selectedDate)}
          />
          {tab === TABS.TODAY && showFeedbackToday && (
            <FeedbackView main={mainFeedback} extra={extraFeedback} />
          )}
        </div>
      </div>
    </div>
  );
}
