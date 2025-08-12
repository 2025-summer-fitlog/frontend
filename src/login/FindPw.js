import styles from "./FindPw.module.css";
import { useState } from "react";

function FindPw() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleContinueClick = async () => {
        if (!username || !name || !email) {
            alert("모든 회원 정보를 입력해주세요.");
            return;
        }

        try {
            const response = await fetch("https://fitlog-2025.duckdns.org/api/users/request-reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, name, email }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
            } else {
                alert("이메일 발송에 실패하였습니다.");
            }
        } catch (error) {
            alert("서버 오류: 잠시 후 다시 시도해주세요");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>비밀번호 찾기</h1>
            <input
                className={styles.Name}
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            /><br />
            <input
                className={styles.ID}
                placeholder="ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /><br />
            <input
                className={styles.Email}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            /><br />
            <button
                className={styles.continue}
                onClick={handleContinueClick}
            >
                CONTINUE
            </button>
        </div>
    );
}

export default FindPw;