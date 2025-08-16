export const getScore = (s) => (s === "O" ? 100 : s === "△" ? 50 : 0);

export function getColorByScore(score) {
  if (score === 0) return "#FFFFFF";
  const alpha = Math.min(score / 100, 1);
  return `rgba(12, 158, 249, ${alpha.toFixed(2)})`;
}
