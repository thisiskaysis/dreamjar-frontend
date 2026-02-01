import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthListener() {
    const navigate = useNavigate();

    useEffect(() => {
        const handler = (event) => {
            const allowedOrigin = import.meta.env.VITE_API_URL;
            if (event.origin !== allowedOrigin) return;
            
            const data = event.data;
            if (data?.access) {
                localStorage.setItem("accessToken", data.access);
                localStorage.setItem("refreshToken", data.refresh);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/");
            }
        };

        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, [navigate]);

    return <p>Logging In...</p>;
}

export default OAuthListener;