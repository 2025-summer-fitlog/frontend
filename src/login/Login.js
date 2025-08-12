import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
    const navigate = useNavigate();

    const [showPw, setShowPw] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const LoginBtnClick = async () => {
        if (!username || !password) {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        try {
            const response = await fetch("https://fitlog-2025.duckdns.org/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {  
                const userId = data.id;
                const userName = data.name;
                localStorage.setItem("userId", userId);
                localStorage.setItem("userName", userName);
                
                alert("로그인 되었습니다.");
                navigate("/information");
            } else {
                alert("로그인에 실패하였습니다.");
            }
        } catch (error) {
            alert("서버 오류: 잠시 후 다시 시도해주세요");
        }
    };

    const forgotPwClick = () => navigate("/findPw");
    const togglePw = () => setShowPw(prev => !prev);

    const handleSocialLogin = async (provider) => {
        try {
            const baseUrl = "https://fitlog-2025.duckdns.org/oauth2/authorization";
            const url = `${baseUrl}/${provider}`;
            window.location.href = url;
        } catch (error) {
            alert("소셜 로그인 오류: 다시 시도해주세요");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.serviceName}>FitLog</h1>
            <input
                className={styles.ID}
                placeholder="ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /><br />
            <input
                className={styles.PW}
                type={showPw ? "text" : "password"}
                placeholder="PW"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br />
            <span
                onClick={togglePw}
                className={styles.eyeIcon}
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
            <button className={styles.login} onClick={LoginBtnClick}>LOGIN</button>
            <div className={styles.circle}>
                <div
                    className={styles.kakao}
                    onClick={() => handleSocialLogin("kakao")}
                ></div>
                <div
                    className={styles.google}
                    onClick={() => handleSocialLogin("google")}
                ></div>
            </div>
            <p className={styles.findPw} onClick={forgotPwClick}>Forgot Password</p>
        </div>
    );
}

export default Login;