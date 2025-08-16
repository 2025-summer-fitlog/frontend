function loadMonthlyLog(baseDate) {
  fetch(`https://fitlog-2025.duckdns.org/api/log/daily/monthly?date=${baseDate}`)
    .then(res => res.json())
    .then(data => {
      const scoreMap = {}; // { "2025-08-01": 100, ... }
      data.forEach(entry => {
        scoreMap[entry.date] = entry.averageScore;
      });

      updateCalendarWithScores(scoreMap); // ✅ 캘린더 색상 반영
    })
    .catch(err => console.error("월간 기록 불러오기 실패:", err));
}
