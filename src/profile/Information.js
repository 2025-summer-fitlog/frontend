import styles from "./Information.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Information() {
    const navigate = useNavigate();

    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    const handleBtnClick = async () => {
        if (!height || !weight || !age || !gender) {
            alert("모든 신체정보를 입력해주세요.");
            return;
        }

        try {
            const response = await fetch("http://fitlog-2025.duckdns.org:8080/api/init/body", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    height: Number(height),
                    weight: Number(weight),
                    age: Number(age),
                    gender
                }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate("/main");
            } else {
                alert("오류가 발생했습니다: " + data.message);
            }
        } catch (error) {
            alert("서버 오류: " + error.message);
        }
    };

    return (
        <div className={styles.container}>
            <section className={styles.body}>
                <h1>신체 정보</h1>
                <input
                    id="height"
                    className={styles.height}
                    type="number"
                    placeholder="키"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
                <span className={styles.cm}>cm</span>
                <input
                    id="weight"
                    className={styles.weight}
                    type="number"
                    placeholder="몸무게"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <span className={styles.kg}>kg</span>
                <div className={styles.age}>
                    <input
                        id="year"
                        className={styles.year}
                        type="number"
                        placeholder="년"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <input
                        id="month"
                        className={styles.month}
                        type="number"
                        placeholder="월"
                    />
                    <input
                        id="day"
                        className={styles.day}
                        type="number"
                        placeholder="일"
                    />
                </div>
                <select
                    id="gender"
                    className={styles.gender}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option selected disabled>성별</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                </select>
                <select id="career" className={styles.career}>
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
                        <input id="hour" placeholder="" type="number"/><span>시간</span>
                        <input id="minute" placeholder="" type="number"/><span>분</span>
                    </div>
                </section>
                <section className={styles.purpose}>
                    <h1>목적</h1>
                    <ul>
                        <li>
                            <input type="radio" name="purpose" id="s1" />
                            <label for="s1">재활</label>
                        </li>
                        <li>
                            <input type="radio" name="purpose" id="s2" />
                            <label for="s2">체력 향상</label>
                        </li>
                        <li>
                            <input type="radio" name="purpose" id="s3" />
                            <label for="s3">다이어트 및 체형 유지</label>
                        </li>
                        <li>
                            <input type="radio" name="purpose" id="s4" />
                            <label for="s4">활력</label>
                        </li>
                        <li>
                            <input type="radio" name="purpose" id="s5" />
                            <label for="s5">기타</label>
                        </li>
                    </ul>
                </section>
            </div>
            <div>
                <section className={styles.frequency}>
                    <h1>횟수</h1>
                    <select id="frequency">
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
                        <li>
                            <input type="checkbox" name="part" id="p1" />
                            <label for="p1">상체</label>
                        </li>
                        <li>
                            <input type="checkbox" name="part" id="p2" />
                            <label for="p2">하체</label>
                        </li>
                        <li>
                            <input type="checkbox" name="part" id="p3" />
                            <label for="p3">복부</label>
                        </li>
                        <li>
                            <input type="checkbox" name="part" id="p4" />
                            <label for="p4">전신</label>
                        </li>
                    </ul>
                </section>
            </div>
            <button className={styles.Btn} onClick={handleBtnClick}>→</button>
        </div>
    );
}

export default Information;