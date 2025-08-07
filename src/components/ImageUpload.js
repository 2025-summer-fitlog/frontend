import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";

function ImageUpload() {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ position: "relative", width: "100px", height: "100px" }}>
      <div
        onClick={handleIconClick}
        style={{
          width: "100px",
          height: "100px",
          border: "2px dashed #ccc",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backgroundColor: "#fdfdfd",
        }}
      >
        <FaCamera size={30} color="#999" />
      </div>

      {previewUrl && (
        <img
          src={previewUrl}
          alt="preview"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100px",
            height: "100px",
            borderRadius: "12px",
            objectFit: "cover",
          }}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default ImageUpload;
