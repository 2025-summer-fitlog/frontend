import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SocialLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get("id");
        const userName = params.get("name");

        if (userId && userName) {
            localStorage.setItem("userId", userId);
            localStorage.setItem("userName", userName);
            alert("로그인 되었습니다.");
            navigate("/information");
        } else {
            alert("로그인에 실패하였습니다.");
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div>로그인 처리 중...</div>
    );
}

export default SocialLogin;