function loadMonthlyLog(baseDate) {
  fetch(`https://fitlog-2025.duckdns.org/api/log/daily/monthly?date=${baseDate}`)
    .then(res => res.json())
    .then(data => {
      const scoreMap = {};
      data.forEach(entry => {
        scoreMap[entry.date] = entry.averageScore;
      });

      updateCalendarWithScores(scoreMap);
    })
    .catch(err => console.error("월간 기록 불러오기 실패:", err));
}
