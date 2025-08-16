import styles from "./main.module.css";
import fitIcon from "./fitIcon.png";
import logIcon from "./logIcon.png";
import profileIconSmall from "../profileIconSmall.png";
import videoIcon from "../videoIcon.png";
import logoutIcon from "../logoutIcon.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Main() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(false);

    const handleLogClick = () => navigate("/Epp");
    const handleFitClick = () => navigate("/fit");
    const handleProfileClick = () => navigate("/profile");
    const handleSaveClick = () => navigate("/save");
    const handleLogoutClick = () => logout();
    const profileMenu = () => setProfile((prev) => !prev);

    const logout = async () => {
        try {
            const response = await fetch("https://fitlog-2025.duckdns.org/api/users/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!response.ok) throw new Error("로그아웃에 실패하였습니다.");

            navigate("/");
        } catch (error) {
            alert("로그아웃에 실패하였습니다.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.profileIcon} onClick={profileMenu}></div>
            {profile && (
                <div className={styles.profile}>
                <span className={styles.p1} onClick={handleProfileClick}>
                    <img
                        src={profileIconSmall}
                        className={styles.prf}
                    />프로필
                </span>
                <span className={styles.p2} onClick={handleSaveClick}>
                    <img
                        src={videoIcon}
                        className={styles.video}
                    />저장영상
                </span>
                <span className={styles.p3} onClick={handleLogoutClick}>
                    <img
                        src={logoutIcon}
                        className={styles.logout}
                    />로그아웃</span>
            </div>
            )}
            <main className={styles.main}>
                <div className={styles.Fit} onClick={handleFitClick}>
                    <h1>Fit</h1>
                    <img
                        src={fitIcon}
                        className={styles.fitImg}
                    />
                </div>
                <div className={styles.Log} onClick={handleLogClick}>
                    <h1>Log</h1>
                    <img
                        src={logIcon}
                        className={styles.logImg}
                    />
                </div>
            </main>
        </div>
    );
}

export default Main;