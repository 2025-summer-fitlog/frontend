import styles from "./Video.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import profileIconSmall from "../profileIconSmall.png";
import videoIcon from "../videoIcon.png";
import logoutIcon from "../logoutIcon.png";
import musicIcon from "./musicIcon.png";
import { useParams } from "react-router-dom";

function Video() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState(false);
    const [warmup, setWarmup] = useState(false);
    const [notice, setNotice] = useState(false);
    const [equipment, setEquipment] = useState(false);
    const [effect, setEffect] = useState(false);
    const [selectedTab, setSelectedTab] = useState("Fit");
    const [clicked, setClicked] = useState(false);
    const [videoData, setVideoData] = useState(null);
    const [music, setMusic] = useState([]);

    const handleProfileClick = () => navigate("/profile");
    const handleSaveClick = () => navigate("/save");
    const handleLogoutClick = () => logout();
    const profileMenu = () => setProfile((prev) => !prev);
    const handleWarmupClick = () => setWarmup((prev) => !prev);
    const handleNoticeClick = () => setNotice((prev) => !prev);
    const handleEquipmentClick = () => setEquipment((prev) => !prev);
    const handleEffectClick = () => setEffect((prev) => !prev);
    const handleLogoClick = () => navigate("/main");

    const { id } = useParams();
    const getUserId = () => localStorage.getItem("userId");

    useEffect(() => {
        const getVideoData = async () => {
            try {
                const response = await fetch(`https://fitlog-2025.duckdns.org/api/fitlog/recommendations/${id}`, {
                    credentials: "include",
                });
                if (!response.ok) throw new Error("영상을 불러오지 못하였습니다.");
                const data = await response.json();
                setVideoData(data);
            } catch (error) {
                alert("영상을 불러오는 데 실패하였습니다.");
            }
        };
        getVideoData();
    }, []);

    function EmbedUrl(url) {
        const match = url.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : "";
    }

    const tag = { "#차분한": 1, "#댄스": 2, "#행복한": 3, "#힙합": 4, "#재즈": 5, "#락": 6, "#슬픈": 7, };

    const handleMusicChange = async (e) => {
        const tagName = e.target.value;
        const tagId = tag[tagName];

        if (!tagId) return;

        try {
            const response = await fetch(`https://fitlog-2025.duckdns.org/api/fitlog/tags/${tagId}/music`, {
                credentials: "include",
            });
            if (!response.ok) throw new Error("플레이리스트를 불러오지 못했습니다.");
            const data = await response.json();
            setMusic(data);
        } catch (error) {
            alert("플레이리스트를 불러오는 데 실패하였습니다.");
        }
    };

    const handleBookmarkClick = async () => {
        const userId = getUserId();
        console.log("userId:", userId);
        console.log("videoId from params:", id);
        try {
            const response = await fetch(`https://fitlog-2025.duckdns.org/api/fitlog/users/${userId}/saved-video/${id}`,
                {
                    method: "POST", 
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId, videoId: id }),
                    credentials: "include",
                }
            );
            if (!response.ok) throw new Error("영상을 저장하지 못하였습니다.");
            setClicked(true);
            alert("추천 영상 저장 완료!");
        } catch (error) {
            alert("영상을 저장하는데 실패하였습니다.");
        }
    };

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
                                className={styles.videoIcon}
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
                <section className={styles.accordion}>
                    <div className={styles.toggle}>
                        <input type="checkbox" className={styles.checkbox} />
                        <button className={styles.toggleBtn} onClick={handleWarmupClick}>
                            <span className={styles.toggleTitle}>준비운동</span>
                            <span className={styles.toggleArrow}>∨</span>
                        </button>
                        {warmup && videoData && (
                            <div className={styles.toggleContent}>
                                <div className={styles.toggleInner}>
                                    {videoData.preparation &&
                                        videoData.preparation
                                            .split("-").filter(line => line.trim() !== "")
                                            .map((line, index) => (
                                                <div key={index}>- {line.trim()}</div>
                                            ))}
                                </div>
                            </div>
                        )}
                        <button className={styles.toggleBtn} onClick={handleNoticeClick}>
                            <span className={styles.title1}>주의사항</span>
                            <span className={styles.arrow}>∨</span>
                        </button>
                        {notice && videoData && (
                            <div className={styles.content1}>
                                <div className={styles.inner}>
                                    {videoData.precautions &&
                                        videoData.precautions
                                            .split("-").filter(line => line.trim() !== "")
                                            .map((line, index) => (
                                                <div key={index}>- {line.trim()}</div>
                                            ))}
                                </div>
                            </div>
                        )}
                        <button className={styles.toggleBtn} onClick={handleEquipmentClick}>
                            <span className={styles.title2}>보조기구</span>
                            <span className={styles.arrow}>∨</span>
                        </button>
                        {equipment && videoData && (
                            <div className={styles.content2}>
                                <div className={styles.inner}>
                                    {videoData.equipment &&
                                        videoData.equipment
                                            .split("-").filter(line => line.trim() !== "")
                                            .map((line, index) => (
                                                <div key={index}>- {line.trim()}</div>
                                            ))}
                                </div>
                            </div>
                        )}
                        <button className={styles.toggleBtn} onClick={handleEffectClick}>
                            <span className={styles.title3}>운동효과</span>
                            <span className={styles.arrow}>∨</span>
                        </button>
                        {effect && videoData && (
                            <div className={styles.content3}>
                                <div className={styles.inner}>
                                    {videoData.effect &&
                                        videoData.effect
                                            .split("-").filter(line => line.trim() !== "")
                                            .map((line, index) => (
                                                <div key={index}>- {line.trim()}</div>
                                            ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={styles.music}>
                        <select defaultValue="#mood" onChange={handleMusicChange}>
                            <option selected disabled>#mood</option>
                            <option>#차분한</option>
                            <option>#댄스</option>
                            <option>#행복한</option>
                            <option>#힙합</option>
                            <option>#재즈</option>
                            <option>#락</option>
                            <option>#슬픈</option>
                        </select>
                        <img src={musicIcon} className={styles.musicIcon} />
                    </div>
                    {music && music.url && (
                        <div className={styles.musicBox}>
                            <audio key={music.url} controls>
                                <source src={`https://fitlog-2025.duckdns.org/api${music.url}`} type="audio/mpeg"/>
                            </audio>
                        </div>
                    )}
                </section>
                {videoData && (
                    <section>
                        <div className={styles.video}>
                            <iframe
                                width="100%"
                                height="100%"
                                src={EmbedUrl(videoData.url)}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </section>
                )}
                <svg
                    className={clicked ? styles.delete : styles.save}
                    onClick={handleBookmarkClick}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16">
                    <path d="M2 2v13.5l5.5-3.5L13 15.5V2z" />
                </svg>
            </main>
        </div>
    );
}

export default Video;