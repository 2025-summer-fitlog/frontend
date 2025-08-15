import React, { useEffect, useState } from "react";
import ExerciseRecord from "./ExerciseRecord";
import MemoInput from "./MemoInput";

export default function RecordEditor({ dateStr, isToday, record, onSave, onDelete }) {
  const [lines, setLines] = useState([]);
  const [memo, setMemo] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const symbols = Array.isArray(record?.symbols) ? record.symbols : [];
    const texts = Array.isArray(record?.texts) ? record.texts : [];
    const merged = texts.length ? texts.map((t,i) => ({ text: t || "", symbol: symbols[i] || "" })) : [{ text:"", symbol:"" }];
    setLines(merged);
    setMemo(record?.memo || "");
    setImages(Array.isArray(record?.img) ? record.img : []);
  }, [record]);

  const handleSave = () => {
    const hasAny = lines.some(l => l.text.trim() !== "");
    if (hasAny && lines.some(l => l.text.trim() === "")) {
      alert("모든 수행 운동 이름을 입력해주세요.");
      return;
    }
    if (hasAny && lines.some(l => !["O","△","X"].includes(l.symbol))) {
      alert("모든 수행 운동에 O/△/X를 선택해주세요.");
      return;
    }
    const filtered = lines.filter(l => l.text.trim() !== "");
    const payload = {
      symbols: filtered.map(l => l.symbol),
      texts: filtered.map(l => l.text.trim()),
      memo,
      img: [...images]
    };
    onSave(payload);
    alert("기록이 저장되었습니다!");
  };

  const doDelete = () => {
    if (window.confirm(`${dateStr} 기록을 삭제하시겠습니까?`)) {
      onDelete();
      window.alert("기록이 삭제되었습니다!");
    }
  };

  return (
    <>
      <div className="record-memo-row">
        <div className="record-box">
          <ExerciseRecord lines={lines} onChange={setLines} />
          <div className="add-line" onClick={() => setLines(prev => [...prev, { text:"", symbol:"" }])}>＋</div>
        </div>

        <div className="memo-box" style={{ position:"relative" }}>
          <MemoInput memo={memo} onMemoChange={setMemo} images={images} onImagesChange={setImages} />
          <div className="btn-group" style={{ position:"absolute", bottom:"-52px", right:20, display:"flex", gap:12 }}>
            {isToday && <button className="save-btn" onClick={handleSave}>저장</button>}
            {!isToday && <button className="save-btn" onClick={handleSave}>수정</button>}
            <button className="save-btn" onClick={doDelete}>삭제</button>
          </div>
        </div>
      </div>
    </>
  );
}
