import React, { useRef } from "react";

export default function ImageUpload({ onAdd }) {
  const ref = useRef(null);
  return (
    <>
      <label className="photo-icon" onClick={() => ref.current?.click()}>
        <img src="https://cdn-icons-png.flaticon.com/512/685/685655.png" alt="사진 추가" />
      </label>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        multiple
        style={{ display:"none" }}
        onChange={(e) => onAdd(Array.from(e.target.files))}
      />
    </>
  );
}
