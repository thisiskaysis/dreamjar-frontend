import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postLogin from "../../api/post-login";
import "./LoginForm.css"

function LoginForm() {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google/login/`;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.email && credentials.password) {
            postLogin(
                credentials.email,
                credentials.password
            ).then((response) => {
                window.localStorage.setItem("access", response.access);
                navigate("/");
            });
        }
    };


    return (
        <div className="login-container">
        <form className="login-form">
            <h2 className="login-title">Welcome Back ✨</h2>
            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="form-input"
                    onChange={handleChange}
                    required
                />
            </div>
            <button
            type="submit"
            className="login-button"
            onClick={handleSubmit}>Login</button>

            <div className="divider"></div>

                      <button
            type="button"
            className="google-button"
            onClick={handleGoogleLogin}
          >
            {/* Google Icon SVG */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M533.5 278.4c0-18.6-1.5-36.5-4.3-53.8H272v101.8h146.9c-6.3 33.7-25.2 62.3-53.7 81.5v67.7h86.8c50.9-46.9 80.5-115.8 80.5-197.2z"
                fill="#4285F4"
              />
              <path
                d="M272 544.3c72.6 0 133.5-24.1 178-65.3l-86.8-67.7c-24 16-54.7 25.3-91.2 25.3-69.9 0-129-47.2-150.1-111.1H32.9v69.7c44.5 87.7 136 154.1 239.1 154.1z"
                fill="#34A853"
              />
              <path
                d="M121.9 327.2c-10.8-31.5-10.8-65.3 0-96.8V160.7H32.9c-42.1 83.7-42.1 182.8 0 266.5l89-69.7z"
                fill="#FBBC05"
              />
              <path
                d="M272 107.7c37.8-.6 73.6 13 101 38.5l75.7-75.7C403.6 24.1 344.7 0 272 0 168.9 0 77.4 66.4 32.9 154.1l89 69.7C143 154.9 202.1 107.7 272 107.7z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </button>

        
        </form>
        </div>
    );
}

export default LoginForm;