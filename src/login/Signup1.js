import styles from "./Signup1.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup1() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");

    const handelEmailSend = async () => {
        try {
            const response = await fetch("https://fitlog-2025.duckdns.org/api/users/send-verification", {
                credentials: "include",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
            } else {
                alert("코드 전송에 실패하였습니다.");
            }
        } catch (error) {
            alert("서버 오류: 잠시 후 다시 시도해주세요");
        }
    };

    const handleVerifyCode = async () => {
        try {
            const response = await fetch("https://fitlog-2025.duckdns.org/api/users/verify-email", {
                credentials: "include",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                localStorage.setItem("signupEmail", email);
                navigate("/signup2");
            } else {
                alert("코드 인증에 실패하였습니다.");
            }
        } catch (error) {
            alert("서버 오류: 잠시 후 다시 시도해주세요");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.serviceName}>FitLog</h1>
            <input
                className={styles.Email}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                className={styles.EmailBtn}
                onClick={handelEmailSend}
            >
                확인
            </button>
            <br />
            <input
                className={styles.Code}
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            /><br />
            <button
                className={styles.continue}
                onClick={handleVerifyCode}
            >
                CONTINUE
            </button>
        </div>
    );
}

export default Signup1;