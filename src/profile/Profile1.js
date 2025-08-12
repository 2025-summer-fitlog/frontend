import styles from "./Profile1.module.css";
import { useEffect, useState } from "react";

function Profile1() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [changePassword, setChangePassword] = useState(false);

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        const storedEmail = localStorage.getItem("signupEmail");

        setForm(prev => ({
            ...prev,
            name: storedName || "",
            email: storedEmail || ""
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (changePassword && form.password !== form.confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const body = {
            name: form.name,
            ...(changePassword && form.password && { password: form.password })
        };

        try {
            const response = await fetch("https://fitlog-2025.duckdns.org/api/profile/personal-info", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!response.ok) throw new Error("정보를 저장하지 못하였습니다.");

            await response.json();
            alert("정보가 저장되었습니다.");
            setForm(prev => ({
                ...prev,
                password: "",
                confirmPassword: ""
            }));
        } catch (error) {
            alert("정보를 저장하는 데 실패하였습니다: " + error.message);
        }
    };

    const [showPw, setShowPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);

    const togglePw = () => setShowPw(prev => !prev);
    const toggleConfirmPw = () => setShowConfirmPw(prev => !prev);

    return (
        <div className={styles.container}>
            <div className={styles.header}>개인 정보 수정</div>
            <input
                className={styles.Name}
                placeholder="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
            />
            <input
                className={styles.Email}
                placeholder="Email"
                name="email"
                value={form.email}
                readOnly
            />
            <input
                className={styles.Password}
                placeholder="Password"
                type={showPw ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
            />
            <span
                className={styles.showPwIcon}
                onClick={togglePw}
            >
                {showPw ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C7.58 19
                                    3.73 16.11 2 12c.73-1.68 1.87-3.18 3.25-4.36M9.88
                                    9.88A3 3 0 0 1 14.12 14.12M1 1l22 22" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                )}
            </span>
            <input
                className={styles.ConfirmPassword}
                placeholder="Confirm Password"
                type={showConfirmPw ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
            />
            <span
                className={styles.showConfirmIcon}
                onClick={toggleConfirmPw}
            >
                {showConfirmPw ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C7.58 19
                                    3.73 16.11 2 12c.73-1.68 1.87-3.18 3.25-4.36M9.88
                                    9.88A3 3 0 0 1 14.12 14.12M1 1l22 22" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                )}
            </span>
            <button className={styles.saveBtn} onClick={handleSave}>저장</button>
        </div>
    );
}

export default Profile1;