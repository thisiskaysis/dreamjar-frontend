import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import "./NavBar.css"

function NavBar() {
    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("access");
        setAuth({ access: null });
    };

    return (
        <div className="nav-container">
            <nav className="navbar">
                <Link to="/">Home</Link>
                <Link to="/dreamjars">Browse</Link>
                <Link to="/account">Account</Link>
                <Link to="/signup">Sign Up</Link>
                {auth.access ? (
                    <Link to="/" onClick={handleLogout}>Log Out</Link>
                ) : (
                    <Link to="/login">Log In</Link>
                )}
            </nav>
        </div>
    );
}

export default NavBar;