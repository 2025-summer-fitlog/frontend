import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css"; // 스타일은 분리된 CSS 파일로 관리 추천

function Header() {
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    if (tab === "log") {
      navigate("/log"); // ✅ /log로 이동
    }
  };

  return (
    <header className="header">
      <h1 className="logo">FitLog</h1>
      <nav className="nav-tabs">
        <ul style={{ display: "flex", gap: "600px", listStyle: "none", padding: 0, margin: 0 }}>
          <li className="tab" onClick={() => handleTabClick("fit")}>Fit</li>
          <li className="tab active" onClick={() => handleTabClick("log")}>Log</li>
        </ul>
      </nav>
      <div className="profile-icon" onClick={() => console.log("goToProfile 실행")}>
        <img src="profileIcon.png" alt="Profile" />
      </div>
    </header>
  );
}

export default Header;
