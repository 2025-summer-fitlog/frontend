const CANONICAL_KEY = "records";

function parseJson(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function collectCandidates() {
  const preferred = [
    "records",
    "record",
    "fitlog-records",
    "fitlog_records",
    "records_v1",
  ];

  const candidates = new Map();

  for (const k of preferred) {
    const raw = localStorage.getItem(k);
    if (!raw) continue;
    const obj = parseJson(raw);
    if (obj && typeof obj === "object" && !Array.isArray(obj)) {
      candidates.set(k, obj);
    }
  }

  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k) continue;
    if (!/record/i.test(k)) continue;
    if (candidates.has(k)) continue;

    const raw = localStorage.getItem(k);
    const obj = parseJson(raw);
    if (obj && typeof obj === "object" && !Array.isArray(obj)) {
      candidates.set(k, obj);
    }
  }

  return candidates;
}

function pickBest(candidates) {
  let bestKey = null;
  let bestObj = null;
  let maxCount = -1;

  for (const [k, obj] of candidates.entries()) {
    const count = Object.keys(obj || {}).length;
    if (count > maxCount) {
      maxCount = count;
      bestKey = k;
      bestObj = obj;
    }
  }
  return { bestKey, bestObj };
}

export function loadAll() {
  const raw = localStorage.getItem(CANONICAL_KEY);
  const obj = parseJson(raw);
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    return obj;
  }

  const candidates = collectCandidates();
  const { bestObj } = pickBest(candidates);

  if (!bestObj) return {};

  try {
    localStorage.setItem(CANONICAL_KEY, JSON.stringify(bestObj));
  } catch {}
  return bestObj;
}

export function saveAll(dataObj) {
  try {
    localStorage.setItem(CANONICAL_KEY, JSON.stringify(dataObj || {}));
  } catch {}
}

export function clearAll() {
  try {
    localStorage.removeItem(CANONICAL_KEY);
  } catch {}
}
