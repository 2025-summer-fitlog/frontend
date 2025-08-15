import { USE_API } from "../utils/dataSource";

const BASE = "";

export function toISODateLocal(d) {
  if (typeof d === "string") return d;
  const dt = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate()
  ); // 로컬 기준 자정
  const pad = (n) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`;
}

async function handle(res, label) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${label} 실패: ${res.status} ${text}`.trim());
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

export async function getWeekly(date) {
  if (!USE_API) {
    // 로컬 모드 (임시 목)
    return [
      { date: "2025-08-04", averageScore: 80 },
      { date: "2025-08-05", averageScore: 60 },
      { date: "2025-08-06", averageScore: 100 },
      { date: "2025-08-07", averageScore: 50 },
      { date: "2025-08-08", averageScore: 70 },
      { date: "2025-08-09", averageScore: 0 },
      { date: "2025-08-10", averageScore: 90 },
    ];
  }
  const q = toISODateLocal(date);
  const res = await fetch(`${BASE}/api/log/daily/weekly?date=${encodeURIComponent(q)}`, {
    method: "GET",
    credentials: "include",
  });
  return handle(res, "getWeekly");
}

export async function getDailyFeedback(date) {
  if (!USE_API) {
    return { date: "2025-08-08", averageScore: 75, feedback: "좋아요!", grade: "우수" };
  }
  const q = toISODateLocal(date);
  const res = await fetch(`${BASE}/api/log/daily/feedback/daily?date=${encodeURIComponent(q)}`, {
    method: "GET",
    credentials: "include",
  });
  return handle(res, "getDailyFeedback");
}

export async function getMonthly(date) {
  if (!USE_API) {
    // 임시 목
    return Array.from({ length: 31 }, (_, i) => ({
      date: `2025-08-${String(i + 1).padStart(2, "0")}`,
      averageScore: Math.floor(Math.random() * 101),
    }));
  }
  const q = toISODateLocal(date);
  const res = await fetch(`${BASE}/api/log/daily/monthly?date=${encodeURIComponent(q)}`, {
    method: "GET",
    credentials: "include",
  });
  return handle(res, "getMonthly");
}

export async function createDaily({ date, memo, workouts, files }) {
  if (!USE_API) {
    return {
      id: 1,
      date: toISODateLocal(date),
      memo,
      photoUrls: [],
      workouts,
    };
  }
  const fd = new FormData();
  fd.append("data", JSON.stringify({
    date: toISODateLocal(date),
    memo,
    workouts,
  }));
  if (files && files.length) {
    for (const f of files) fd.append("files", f);
  }
  const res = await fetch(`${BASE}/api/log/daily`, {
    method: "POST",
    body: fd,
    credentials: "include",
  });
  return handle(res, "createDaily");
}

export async function updateDaily(logId, { date, memo, workouts, photoUrls }) {
  if (!USE_API) {
    return {
      id: logId,
      date: toISODateLocal(date),
      memo,
      photoUrls: photoUrls || [],
      workouts,
    };
  }
  const payload = {
    date: toISODateLocal(date),
    memo,
    workouts,
    photoUrls: photoUrls || [],
  };
  const res = await fetch(`${BASE}/api/log/daily/${encodeURIComponent(logId)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  return handle(res, "updateDaily");
}

export async function deleteDailyRow(logId) {
  if (!USE_API) return "";
  const res = await fetch(`${BASE}/api/log/daily/${encodeURIComponent(logId)}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handle(res, "deleteDailyRow");
}

export async function deleteDailyAll() {
  if (!USE_API) return "";
  const res = await fetch(`${BASE}/api/log/records/all`, {
    method: "DELETE",
    credentials: "include",
  });
  return handle(res, "deleteDailyAll");
}
