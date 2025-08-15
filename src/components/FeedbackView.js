import React, { useMemo } from "react";

export default function FeedbackView({ main, extra }) {
  const message = useMemo(() => {
    const trimmedExtra = (extra || "").trim();
    if (trimmedExtra) {
      const first = trimmedExtra.split(/<br\s*\/?>/i)[0]?.trim();
      if (first) return first;
    }
    return (main || "").trim();
  }, [main, extra]);

  return (
    <div className="quote" id="feedback-section" style={{ display: "flex" }}>
      <div
        className="character"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/runnerIcon.png)`,
        }}
      />
      <div className="balloon-text">{message}</div>
    </div>
  );
}
