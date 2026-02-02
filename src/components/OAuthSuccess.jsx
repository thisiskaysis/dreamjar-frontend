import { useEffect } from "react";

function OAuthSuccess() {

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const access = params.get("access");
        const refresh = params.get("refresh");
        const user = params.get("user");
        const loginSuccess = params.get("login_success");
            
        if (access && loginSuccess === "true") {
            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);
            localStorage.setItem("user", user);

            window.history.replaceState({}, document.title, "/");

            if (window.opener && !window.opener.closed) {
                window.opener.location.assign("/account");
            }

            window.close();
        }
    }, []);

    return <p>Logging in...</p>;
}

export default OAuthSuccess;