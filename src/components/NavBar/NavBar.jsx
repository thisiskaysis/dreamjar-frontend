import { Link, Outlet } from "react-router-dom";
import "./NavBar.css"

function NavBar() {
    return (
        <div className="nav-container">
            <nav className="navbar">
                <Link to="/">Home</Link>
                <Link to="/dreamjars">Browse</Link>
                <Link to="/account">Account</Link>
                <Link to="/login">Log In</Link>
                <Link to="/signup">Sign Up</Link>
            </nav>
        </div>
    );
}

export default NavBar;