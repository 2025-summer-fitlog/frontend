import styles from "./Signup2.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem("signupEmail");
        if (storedEmail) {
            setEmail(storedEmail)
        };
    }, []);

    const handleSignupClick = async () => {
        if (!email || !username || !password || !name) {
            alert("모든 회원 정보를 입력해주세요.");
            return;
        }

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await fetch("https://fitlog-2025.duckdns.org/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username, password, name }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("userName", name);
                alert("회원가입 되었습니다. 로그인을 진행해주세요.");
                navigate("/");
            } else {
                alert("회원가입 실패: " + data.message);
            }
        } catch (error) {
            alert("서버 오류: " + error.message);
        }
    };

    const togglePw = () => setShowPw(prev => !prev);
    const toggleConfirmPw = () => setShowConfirmPw(prev => !prev);

    return (
        <div className={styles.container}>
            <h1 className={styles.serviceName}>FitLog</h1>
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
                className={styles.Password}
                placeholder="Password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br />
            <span
                className={styles.showPwIcon}
                onClick={togglePw}
            >
                {showPw ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C7.58 19
                        3.73 16.11 2 12c.73-1.68 1.87-3.18 3.25-4.36M9.88
                        9.88A3 3 0 0 1 14.12 14.12M1 1l22 22" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                )}
            </span>
            <input
                className={styles.Confirm}
                placeholder="Confirm Password"
                type={showConfirmPw ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            /><br />
            <span
                className={styles.showConfirmIcon}
                onClick={toggleConfirmPw}
            >
                {showConfirmPw ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C7.58 19
                        3.73 16.11 2 12c.73-1.68 1.87-3.18 3.25-4.36M9.88
                        9.88A3 3 0 0 1 14.12 14.12M1 1l22 22" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                )}
            </span>
            <button
                className={styles.signUp}
                onClick={handleSignupClick}
            >
                SIGN UP
            </button>
        </div>
    );
}

export default Signup;