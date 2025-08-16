import { getScore } from "./score";
import { getTodayStr } from "./date";

export function getMainFeedback(score) {
  if (score >= 90) return "🎉 대단해요! 꾸준한 운동 습관이 형성되어 가고 있어요. 지금 페이스를 유지해보세요!";
  if (score >= 75) return "👍 좋은 흐름이에요! 약간의 아쉬운 날도 있지만 전체적으로 훌륭해요. 조금만 더 집중해봐요!";
  if (score >= 60) return "💪 중간은 했어요! 그래도 개선 여지가 보여요. 실패한 날을 돌아보고 다음엔 성공해봐요.";
  if (score >= 40) return "😐 아쉬운 한 주였어요. △를 ○로 바꾸기 위한 전략을 세워보면 좋을 것 같아요.";
  if (score >= 20) return "🌀 약간 흔들렸네요. 쉬어가는 것도 좋지만 다시 루틴을 재정비해봐요. 짧은 목표부터 시작해도 좋아요!";
  return "🫣 거의 운동을 하지 못했어요. 무리한 계획은 아니었나요? 작게라도 실천할 수 있는 계획을 세워보는 건 어때요?";
}

export function getConditionalFeedback(records, todayStr = getTodayStr()) {
  const dates = Object.keys(records).sort();
  const todayIdx = dates.indexOf(todayStr);
  if (todayIdx < 0) return "";

  const toCount = (arr, s) => (arr || []).filter(e => e === s).length;
  const todaySymbols = (records[todayStr]?.symbols) || [];
  const yesterdaySymbols = dates[todayIdx - 1] ? (records[dates[todayIdx - 1]]?.symbols || []) : [];

  const recent = dates.slice(Math.max(0, todayIdx - 2), todayIdx + 1);
  const prev2 = dates.slice(Math.max(0, todayIdx - 1), todayIdx + 1);

  const tips = [];

  if (recent.length === 3 && recent.every(d => toCount(records[d]?.symbols || [], "O") >= 1)) {
    tips.push("🌟 3일 연속 성공! 습관이 만들어지고 있어요. 이 흐름을 계속 이어가 봐요!");
  }
  if (prev2.length === 2 && prev2.every(d => toCount(records[d]?.symbols || [], "X") >= 1)) {
    tips.push("⏳ 조금 쉬었나 봐요. 괜찮아요, 누구에게나 그런 날은 있어요. 다시 가볍게 시작해볼까요?");
  }
  if (toCount(todaySymbols, "△") > toCount(todaySymbols, "O")) {
    tips.push("🧩 완벽하진 않았지만 시도한 점이 중요해요! △를 ○로 바꿀 수 있는 요인을 한번 고민해봐요.");
  }
  if (yesterdaySymbols.includes("O") && todaySymbols.includes("X")) {
    tips.push("📉 한 날은 잘하고, 다음 날은 쉬고 반복하고 있어요. 운동 강도를 조절하거나 쉬는 날을 계획해보는 것도 방법이에요!");
  }
  if (toCount(todaySymbols, "X") >= 2 && (records[todayStr]?.memo || "").trim()) {
    tips.push("✍️ 기록을 남긴 건 멋진 습관이에요! 실천이 안 된 이유를 통해 다음 전략을 짜볼 수 있어요.");
  }

  return tips.join("<br>");
}
