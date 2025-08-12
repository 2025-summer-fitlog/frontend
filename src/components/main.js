document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("tab-daily").addEventListener("click", () => {
    loadDailyLog();
  });

  document.getElementById("tab-weekly").addEventListener("click", () => {
    const today = new Date().toISOString().slice(0, 10);
    loadWeeklyLog(today);
  });

  document.getElementById("tab-monthly").addEventListener("click", () => {
    const today = new Date().toISOString().slice(0, 10);
    loadMonthlyLog(today);
  });
});
