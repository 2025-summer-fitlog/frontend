function loadWeeklyLog(baseDate) {
  fetch(`https://fitlog-2025.duckdns.org/api/log/daily/weekly?date=${baseDate}`)
    .then(res => res.json())
    .then(data => {
      const labels = [];
      const scores = [];

      data.forEach(entry => {
        const date = new Date(entry.date);
        labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
        scores.push(entry.averageScore);
      });

      updateBarChart(labels, scores); // ✅ 막대 차트 그리기
    })
    .catch(err => console.error("주간 기록 불러오기 실패:", err));
}
