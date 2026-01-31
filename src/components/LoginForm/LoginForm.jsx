import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postLogin from "../../api/post-login";

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
        <form>
            <div>
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>Login</button>
        </form>
    );
}

export default LoginForm;