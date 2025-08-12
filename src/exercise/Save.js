import styles from "./Save.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Save() {
    const navigate = useNavigate();

    const getUserId = () => localStorage.getItem("userId");
    const [saved, setSaved] = useState({ 상체: [], 하체: [], 복부: [], 전신: [] });

    const tagName = {
        "상체": "#상체",
        "하체": "#하체",
        "복부": "#복부",
        "전신": "#전신"
    };

    const types = ["상체", "하체", "복부", "전신"];

    useEffect(() => {
        const userId = getUserId();

        const getSaved = async () => {
            try {
                const result = await Promise.all(types.map(async (type) => {
                    const response = await fetch(`https://fitlog-2025.duckdns.org/fitlog/users/${userId}/saved-videos-by-type?type=${type}`);
                    if (!response.ok) throw new Error("저장된 영상을 불러오지 못하였습니다.");
                    const data = await response.json();
                    return [type, Array.isArray(data) ? data : []];
                }));
                const newSaved = Object.fromEntries(result);
                setSaved(newSaved);
            } catch (error) {
                alert("저장된 영상을 불러오는 데 실패하였습니다.");
            }
        };

        getSaved();
    }, []);

    const getThumbnail = (url) => {
        if (!url) return "";
        const match = url.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? `https://img.youtube.com/vi/${match[1]}/0.jpg` : "";
    };

    return (
        <div className={styles.container}>
            <h1>내가 저장한 운동 영상</h1>
            <div className={styles.screen}>
                {types.map((type) => (
                    <main className={styles.main} key={type}>
                        <h2>{tagName[type]}</h2>
                        <section className={styles.video}>
                            {saved[type].length === 0 && (
                                <div className={styles.noVideo}>저장한 영상이 없습니다.</div>
                            )}
                            {saved[type].map((video) => (
                                <div
                                    className={styles.thumbnail}
                                    key={video.id}
                                    onClick={() => navigate(`/video/${video.id}`)}
                                    style={{
                                        backgroundImage: `url(${getThumbnail(video.url)})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                    }}
                                    title={video.title}
                                ></div>
                            ))}
                        </section>
                    </main>
                ))}
            </div>
        </div>
    );
}

export default Save;