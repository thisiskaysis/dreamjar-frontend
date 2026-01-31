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
        </form>
        </div>
    );
}

export default LoginForm;