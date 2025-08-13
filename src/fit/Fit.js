import styles from "./Fit.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import profileIconSmall from "../profileIconSmall.png";
import videoIcon from "../videoIcon.png";
import logoutIcon from "../logoutIcon.png";

function Fit() {
    const navigate = useNavigate();

    const [place, setPlace] = useState([]);
    const [placeId, setPlaceId] = useState(null);
    const [placeName, setPlaceName] = useState("");
    const [exerciseOption, setExerciseOption] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState([]);
    const [profile, setProfile] = useState(false);
    const [selectedTab, setSelectedTab] = useState("Fit");

    const handleProfileClick = () => navigate("/profile");
    const handleSaveClick = () => navigate("/save");
    const handleLogoutClick = () => logout();
    const handleLogoClick = () => navigate("/main");
    const profileMenu = () => setProfile((prev) => !prev);

    useEffect(() => {
        const getPlace = async () => {
            try {
                const response = await fetch("https://fitlog-2025.duckdns.org/api/fitlog/places", {
                    credentials: "include",
                });
                if (!response.ok) throw new Error("장소 정보를 불러오지 못하였습니다.");
                const data = await response.json();
                setPlace(data);
                setPlaceId(data[0].id);
                setPlaceName(data[0].name);
            } catch (error) {
                alert("장소 정보를 불러오는 데 실패하였습니다.");
            }
        };
        getPlace();
    }, []);

    useEffect(() => {
        if (placeId !== null) {
            const getExercise = async () => {
                try {
                    const response = await fetch(`https://fitlog-2025.duckdns.org/api/fitlog/exercises/${placeId}`, {
                        credentials: "include",
                    });
                    if (!response.ok) throw new Error("운동 정보를 불러오지 못하였습니다.");
                    const data = await response.json();
                    setExerciseOption(data);
                    setSelectedExercise([]);
                } catch (error) {
                    alert("운동 정보를 불러오는 데 실패하였습니다.");
                }
            };
            getExercise();
        }
    }, [placeId]);

    const handleExerciseChange = (event) => {
        const { value, checked } = event.target;
        setSelectedExercise((prev) => checked
            ? [...prev, value] : prev.filter((exercise) => exercise !== value)
        );
    };

    const handlePlaceSelect = (event) => {
        const selectedName = event.target.value;
        const selected = place.find((p) => p.name === selectedName);
        if (selected) {
            setPlaceId(selected.id);
            setPlaceName(selected.name);
        }
    };

    const handleStartClick = () => {
        if (selectedExercise.length === 0) {
            alert("운동 정보를 선택해주세요.");
            return;
        }
        localStorage.setItem("selectedExercise", JSON.stringify(selectedExercise));
        navigate("/recommend");
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
                            navigate("/log");
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
                <div className={styles.place}>
                    <h1>장소</h1>
                    <ul className={styles.placeOption}>
                        {place.map((p) => (
                            <li key={p.id}>
                                <input
                                    type="radio"
                                    name="select"
                                    id={`place-${p.id}`}
                                    value={p.name}
                                    onChange={handlePlaceSelect}
                                    checked={placeName === p.name}
                                /><label htmlFor={`place-${p.id}`}>{p.name}</label>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.exercise}>
                    <h1>운동 정보</h1>
                    <ul className={styles.exerciseOption}>
                        {exerciseOption.map((exercise) => (
                            <li key={exercise.id}>
                                <input
                                    type="checkbox"
                                    id={`exercise-${exercise.id}`}
                                    value={exercise.name}
                                    onChange={handleExerciseChange}
                                    checked={selectedExercise.includes(exercise.name)}
                                />
                                <label htmlFor={`exercise-${exercise.id}`}>{exercise.name}</label>
                            </li>
                        ))}
                    </ul>
                    <button
                        className={styles.startBtn}
                        onClick={handleStartClick}
                    >
                        시작하기
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Fit;