import React, { useRef, useState, useEffect } from "react";

export default function MemoInput({ memo, onMemoChange, images, onImagesChange }) {
  const fileRef = useRef(null);
  const [viewerSrc, setViewerSrc] = useState(null); 

  const handleFiles = (files) => {
    const arr = Array.from(files);
    arr.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImagesChange((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
    if (fileRef.current) fileRef.current.value = "";
  };

  const deleteImage = (idx) => {
    onImagesChange(images.filter((_, i) => i !== idx));
  };

  useEffect(() => {
    if (!viewerSrc) return;
    const onKey = (e) => {
      if (e.key === "Escape") setViewerSrc(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewerSrc]);

  return (
    <>
      <div className="memo-input-wrapper">
        <div className="image-preview-in-memo" id="image-preview-in-memo">
          {images.map((src, idx) => (
            <div className="preview-wrapper" key={idx}>
              <img
                src={src}
                alt="업로드 이미지"
                onClick={() => setViewerSrc(src)}
                style={{ cursor: "zoom-in" }}
              />
              <button className="delete-image-btn" onClick={() => deleteImage(idx)}>
                X
              </button>
            </div>
          ))}
        </div>

        <label className="photo-icon" onClick={() => fileRef.current?.click()}>
          <img src="https://cdn-icons-png.flaticon.com/512/685/685655.png" alt="사진 추가" />
        </label>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />

        <textarea
          className="memo-input"
          placeholder="오늘의 운동 기록"
          value={memo}
          onChange={(e) => onMemoChange(e.target.value)}
        />
      </div>

      {viewerSrc && (
        <div
          className="image-modal"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setViewerSrc(null);
          }}
        >
          <img
            src={viewerSrc}
            alt="첨부 이미지 크게 보기"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
