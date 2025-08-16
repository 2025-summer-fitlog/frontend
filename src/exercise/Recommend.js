import styles from "./Recommend.module.css";
import profileIconSmall from "../profileIconSmall.png";
import videoIcon from "../videoIcon.png";
import logoutIcon from "../logoutIcon.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Recommend() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState(false);
    const [selectedTab, setSelectedTab] = useState("Fit");
    const [selectedExercise, setSelectedExercise] = useState([]);
    const [recommend, setRecommend] = useState([]);

    const handleProfileClick = () => navigate("/profile");
    const handleSaveClick = () => navigate("/save");
    const handleLogoutClick = () => logout();
    const handleLogoClick = () => navigate("/main");
    const profileMenu = () => setProfile((prev) => !prev);

    const handleVideoClick = (id) => navigate(`/video/${id}`);

    useEffect(() => {
        const getVideo = async (keywords) => {
            try {
                const shuffled = keywords.sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, Math.min(3, keywords.length));
                const query = selected.map((k) => encodeURIComponent(k)).join(",");
                const response = await fetch(`https://fitlog-2025.duckdns.org/api/fitlog/recommendations?keywords=${query}`, {
                    credentials: "include",
                });
                if (!response.ok) throw new Error("추천 영상을 불러오지 못하였습니다.");
                const data = await response.json();
                setRecommend(data);
            } catch (error) {
                alert("추천 영상을 불러오는 데 실패하였습니다.");
            }
        };

        const storedExercise = localStorage.getItem("selectedExercise");
        if (storedExercise) {
            setSelectedExercise(JSON.parse(storedExercise));
            getVideo(JSON.parse(storedExercise));
        }
    }, []);

    function extract(url) {
        try {
            const u = new URL(url);
            if (u.hostname.includes("youtube.com")) {
                return u.searchParams.get("v");
            } else if (u.hostname.includes("youtu.be")) {
                return u.pathname.split("/")[1];
            }
        } catch (error) {
            return null;
        }
    }

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

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 onClick={handleLogoClick}>FitLog</h1>
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
            </header>
            <main className={styles.main}>
                {recommend.slice(0, 3).map((video, index) => (
                    <section
                        key={video.id}
                        className={styles.section}
                        onClick={() => handleVideoClick(video.id)}
                    >
                        <div className={styles.title}>{video.title}</div>
                        {video.url && (
                            <div className={styles.thumbnailBox}>
                                <img
                                    className={styles.thumbnail}
                                    src={`https://img.youtube.com/vi/${extract(video.url)}/0.jpg`}
                                    alt="thumbnail"
                                />
                            </div>
                        )}
                        <div className={styles.keyword}>핵심 키워드</div>
                        {video.keywords.map((keyword, idx) => (
                            <div key={idx} className={styles.hashtag}>#{keyword}</div>
                        ))}
                    </section>
                ))}
            </main>
        </div>
    );
}

export default Recommend;