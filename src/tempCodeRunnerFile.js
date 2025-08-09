// src/App.js
import { useEffect } from "react";

/**
 * React는 초기화(예: 전역 함수 호출, 이벤트 바인딩)만 담당하고
 * 화면 DOM/스타일은 public/index.html에 있는 걸 그대로 쓰는 전략.
 * => 디자인 절대 안 깨짐.
 */
export default function App() {
  useEffect(() => {
    // index.html에 넣어둔 전역 함수가 있다면 여기서 한 번 호출
    if (typeof window.loadDailyLog === "function") {
      window.loadDailyLog();
    }
    // 필요하면 여기서 버튼 이벤트에 API 연동 바인딩도 가능
  }, []);

  // 화면은 index.html이 담당하므로 React는 아무 것도 렌더하지 않음
  return null;
}
