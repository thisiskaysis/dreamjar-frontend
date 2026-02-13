import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import "./NavBar.css";

function NavBar() {
    const { auth, setAuth } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        window.localStorage.removeItem("access");
        setAuth({ access: null });
        setIsOpen(false); // close menu on logout
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <nav className="navbar">
                <div className="nav-left">
                    <NavLink to="/" className="logo">
                        DreamJar
                    </NavLink>
                </div>

                {/* Hamburger button */}
                <div 
                    className={`hamburger ${isOpen ? "open" : ""}`} 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* Links */}
                <div className={`nav-links ${isOpen ? "open" : ""}`}>
                    <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>Home</NavLink>
                    <NavLink to="/dreamjars" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>Browse</NavLink>
                    <NavLink to="/account" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>Account</NavLink>
                    {auth.access ? (
                        <Link to="/" onClick={handleLogout}>Log Out</Link>
                    ) : (
                        <NavLink to="/login" onClick={() => setIsOpen(false)}>Log In/Sign Up</NavLink>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
