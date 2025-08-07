import styles from "./Profile2.module.css";
import { useState, useEffect } from "react";

function Profile2() {
    const [data, setData] = useState({
        height: "", weight: "",
        year: "", month: "", day: "",
        gender: "",
        career: "",
        hour: "", minute: "",
        purpose: "",
        frequency: "",
        part: [], 
    });

    const handleInputChange = (key, value) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    const handleCheckChange = (value) => {
        setData(prev => {
            const updatedPart = prev.part.includes(value)
                ? prev.part.filter(p => p !== value)
                : [...prev.part, value];
            return { ...prev, part: updatedPart };
        });
    };

    const handleSave = () => {
        localStorage.setItem("information", JSON.stringify(data));
        alert("저장되었습니다.");
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>운동 정보 수정</h1>
            <section className={styles.body}>
                <h1>신체 정보</h1>
                <input
                    className={styles.height}
                    type="number"
                    placeholder="키"
                    value={data.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                />
                <span className={styles.cm}>cm</span>
                <input
                    className={styles.weight}
                    type="number"
                    placeholder="몸무게"
                    value={data.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                />
                <span className={styles.kg}>kg</span>
                <div className={styles.age}>
                    <input
                        className={styles.year}
                        type="number"
                        placeholder="년"
                        value={data.year}
                        onChange={(e) => handleInputChange("year", e.target.value)}
                    />
                    <input
                        className={styles.month}
                        type="number"
                        placeholder="월"
                        value={data.month}
                        onChange={(e) => handleInputChange("month", e.target.value)}
                    />
                    <input
                        className={styles.day}
                        type="number"
                        placeholder="일"
                        value={data.day}
                        onChange={(e) => handleInputChange("day", e.target.value)}
                    />
                </div>
                <select
                    className={styles.gender}
                    value={data.gender}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                >
                    <option selected disabled>성별</option>
                    <option>남성</option>
                    <option>여성</option>
                </select>
                <select
                    className={styles.career}
                    value={data.career}
                    onChange={(e) => handleInputChange("career", e.target.value)}
                >
                    <option selected disabled>운동 경력</option>
                    <option>입문</option>
                    <option>초급</option>
                    <option>중급</option>
                    <option>상급</option>
                    <option>전문</option>
                </select>
            </section>
            <div>
                <section className={styles.time}>
                    <h1>시간</h1>
                    <div>
                        <input
                            placeholder=""
                            type="number"
                            value={data.hour}
                            onChange={(e) => handleInputChange("hour", e.target.value)}
                        /><span>시간</span>
                        <input
                            placeholder=""
                            type="number"
                            value={data.minute}
                            onChange={(e) => handleInputChange("minute", e.target.value)}
                        /><span>분</span>
                    </div>
                </section>
                <section className={styles.purpose}>
                    <h1>목적</h1>
                    <ul>
                        {["재활", "체력 향상", "다이어트 및 체형 유지", "활력", "기타"]
                            .map((item, index) => (
                            <li key={index}>
                                <input
                                    type="radio"
                                    name="select"
                                    id={`s${index}`}
                                    checked={data.purpose === item}
                                    onChange={() => handleInputChange("purpose", item)}
                                />
                                <label htmlFor={`s${index}`}>{item}</label>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
            <div>
                <section className={styles.frequency}>
                    <h1>횟수</h1>
                    <select
                        value={data.frequency}
                        onChange={(e) => handleInputChange("frequency", e.target.value)}
                    >
                        <option selected disabled>선택</option>
                        <option>주 1회</option>
                        <option>주 2회</option>
                        <option>주 3회</option>
                        <option>주 4회</option>
                        <option>주 5회</option>
                        <option>주 6회</option>
                        <option>주 7회</option>
                    </select>
                </section>
                <section className={styles.part}>
                    <h1>주요 부위</h1>
                    <ul>
                    {["상체", "하체", "복부", "전신"].map((part, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                name="select"
                                id={`p${index}`}
                                checked={data.part.includes(part)}
                                onChange={() => handleCheckChange(part)}
                            /><label htmlFor={`p${index}`}>{part}</label>
                        </li>
                    ))}
                    </ul>
                </section>
            </div>
            <button className={styles.Btn} onClick={handleSave}>확인</button>
        </div>
    );
}

export default Profile2;