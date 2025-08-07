import React from "react";

function TabMenu({ currentTab, onTabChange }) {
  const tabs = ["일별", "주간", "월별"];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30px",
        marginBottom: "20px",
        gap: "100px",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={currentTab === tab ? "active" : ""}
          style={{
            padding: "12px 30px",
            border: "1px solid #9ADBF6",
            background: currentTab === tab ? "#9ADBF6" : "#F5FBFE",
            color: currentTab === tab ? "white" : "black",
            borderRadius: "20px",
            fontSize: "22px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s",
            transform: currentTab === tab ? "scale(1.15)" : "scale(1)",
            boxShadow:
              currentTab === tab ? "0 4px 10px rgba(0,0,0,0.1)" : "none",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default TabMenu;
