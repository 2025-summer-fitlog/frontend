import styles from "./Profile.module.css";
import profile1Icon from "./profile1Icon.png";
import profile2Icon from "./profile2Icon.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Profilescrn() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const handleInformClick = () => navigate("/inform");
    const handleExerciseClick = () => navigate("/exercise");
    const handleBackBtnClick = () => navigate(-1);

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (storedName) setName(storedName);
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.profile}></div>
                <h1 className={styles.username}>{name}</h1>
            </header>
            <main className={styles.main}>
                <div className={styles.Inform} onClick={handleInformClick}>
                    <h1>개인 정보 수정</h1>
                    <img
                        src={profile1Icon}
                        className={styles.img1}
                    />
                </div>
                <div className={styles.Exercise} onClick={handleExerciseClick}>
                    <h1>운동 정보 수정</h1>
                    <img
                        src={profile2Icon}
                        className={styles.img2}
                    />
                </div>
                <div className={styles.button}>
                    <button className={styles.back} onClick={handleBackBtnClick}>‹</button>
                </div>
            </main>
        </div>
    );
}

export default Profilescrn;