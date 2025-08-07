import styles from "./Home.module.css";
import firstIcon from "./firstIcon.png";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    }

    const handleSignupClick = () => {
        navigate("/signup1");
    }

    return (
        <div className={styles.Home}>
            <h1 className={styles.serviceName}>FitLog</h1>
            <p className={styles.serviceContent}>사용자의 운동과 건강을<br />기록하고 관리하는 서비스</p>
            <button className={styles.loginButton} onClick={handleLoginClick}>로그인</button>
            <button className={styles.signupButton} onClick={handleSignupClick}>회원가입</button>
            <img src={firstIcon} className={styles.homeImg} />
        </div>
    );
}

export default Home;