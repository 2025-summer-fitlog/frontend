function loadDailyLog() {
  fetch('https://fitlog-2025.duckdns.org/api/log/daily/today')
    .then(res => res.json())
    .then(data => {
      // 도넛 차트 업데이트
      updateDonutChart(data.averageScore);

      // ○ △ × 운동 기록 표시
      const recordList = document.getElementById("record-list");
      recordList.innerHTML = "";
      data.workouts.forEach(workout => {
        const div = document.createElement("div");
        div.textContent = `${workout.workoutName} : ${workout.statusSymbol}`;
        recordList.appendChild(div);
      });

      // 메모 표시
      document.getElementById("memo").value = data.memo;

      // 사진 렌더링
      const photoArea = document.getElementById("photo-area");
      photoArea.innerHTML = "";
      data.photoUrls.forEach(url => {
        const img = document.createElement("img");
        img.src = `https://fitlog-2025.duckdns.org${url}`;
        img.style.width = "80px";
        img.style.marginRight = "8px";
        photoArea.appendChild(img);
      });
    })
    .catch(err => console.error("일간 기록 불러오기 실패:", err));
}
