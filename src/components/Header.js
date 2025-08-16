import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./header.module.css";

import profileIcon from "../profileIconSmall.png";
import videoIcon from "../videoIcon.png";
import logoutIcon from "../logoutIcon.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedTab, setSelectedTab] = useState("Fit");
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // 로고 클릭 시 홈(또는 원하는 곳)으로 이동
  const handleLogoClick = () => {
    navigate("/main"); 
    setSelectedTab("FitLog");
  };

  useEffect(() => {
    if (location.pathname.startsWith("/Epp")) {
      setSelectedTab("Log");
    } else if (location.pathname.startsWith("/fit") || location.pathname === "/") {
      setSelectedTab("Fit");
    }
  }, [location.pathname]);

  const toggleProfileMenu = () => setProfileOpen((prev) => !prev);

  // 프로필/저장영상/로그아웃 액션
  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleSaveClick = () => {
    navigate("/save");
  };

  const handleLogoutClick = () => logout();

  const logout = async () => {
        try {
            const response = await fetch("https://fitlog-2025.duckdns.org/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) throw new Error("로그아웃에 실패하였습니다.");

            navigate("/");
        } catch (error) {
            alert("로그아웃에 실패하였습니다.");
        }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  return (
    <header className={styles.header}>
      <h1 className={styles.logo} onClick={handleLogoClick}>FitLog</h1>
      <ul className={styles.tab}>
        <li
          className={selectedTab === "Fit" ? styles.active : styles.inactive}
          onClick={() => {
            setSelectedTab("Fit");
            navigate("/fit");
          }}
        >
          Fit
        </li>
        <li
          className={selectedTab === "Log" ? styles.active : styles.inactive}
          onClick={() => {
            setSelectedTab("Log");
            navigate("/Epp");
          }}
        >
          Log
        </li>
      </ul>

      <div ref={profileRef} className={styles.profileWrap}>
        <div
          className={styles.profileIcon}
          onClick={toggleProfileMenu}
          role="button"
          aria-haspopup="menu"
          aria-expanded={profileOpen}
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" ? toggleProfileMenu() : null)}
        />
        {profileOpen && (
          <div className={styles.profile} role="menu">
            <span className={styles.p1} onClick={handleProfileClick} role="menuitem" tabIndex={0}>
              <img src={profileIcon} className={styles.prf} alt="" />
              프로필
            </span>
            <span className={styles.p2} onClick={handleSaveClick} role="menuitem" tabIndex={0}>
              <img src={videoIcon} className={styles.video} alt="" />
              저장영상
            </span>
            <span className={styles.p3} onClick={handleLogoutClick} role="menuitem" tabIndex={0}>
              <img src={logoutIcon} className={styles.logout} alt="" />
              로그아웃
            </span>
          </div>
        )}
      </div>
    </header>
  );
}