//저장 수정 삭제 후 그래프 및 피드백 자동 새로고침
const EVENT = "fitlog:changed";

export function emitFitlogChanged() {
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function onFitlogChanged(handler) {
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
