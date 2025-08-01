function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.tab[data-tab="${tab}"]`)?.classList.add('active');

  if (tab === 'fit') {
    window.location.href = 'fit.html';
  } else if (tab === 'log') {
    window.location.href = 'log.html';
  }
}

function goToProfile() {
  window.location.href = "profile.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  if (container) {
    // 작업 수행
  }
});