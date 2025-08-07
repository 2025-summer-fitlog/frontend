import styles from "./ResetPw.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ResetPw() {
    const navigate = useNavigate();

    const [showPw, setShowPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);
    
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState("");
    const [isTokenValid, setIsTokenValid] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const urlToken = new URLSearchParams(window.location.search).get("token");
            console.log('Extracted Token:', urlToken);
            if (!urlToken) return;

            setToken(urlToken);

            try {
                const response = await fetch(`https://fitlog-2025.duckdns.org/api/users/check-reset-token?token=${urlToken}`);
                if (!response.ok) throw new Error("토큰이 유효하지 않습니다.");
                setIsTokenValid(true);
            } catch (error) {
                alert("링크가 만료되었거나 오류가 발생하였습니다.");
            }
        };

        checkToken();
    }, []);

    const handleSubmitClick = async () => {
        if (!newPassword || !confirmPassword) {
            alert("모든 회원 정보를 입력해주세요.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await fetch("https://fitlog-2025.duckdns.org/api/users/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: token, newPassword: newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                navigate("/login");
            } else {
                alert("오류가 발생했습니다: " + data.message);
            }
        } catch (error) {
            alert("서버 오류: " + error.message);
        }
    };

    if (!isTokenValid) return <div className={styles.container}>유효하지 않은 링크입니다.</div>;

    const togglePw = () => setShowPw(prev => !prev);
    const toggleConfirmPw = () => setShowConfirmPw(prev => !prev);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>비밀번호 재설정</h1>
            <input
                className={styles.NewPw}
                placeholder="New Password"
                type={showPw ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                className={styles.ConfirmNewPw}
                placeholder="Confirm New Password"
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
                className={styles.submit}
                onClick={handleSubmitClick}
            >
                Submit
            </button>
        </div>
    );
}

export default ResetPw;