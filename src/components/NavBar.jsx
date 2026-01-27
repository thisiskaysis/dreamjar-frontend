import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className='nav-bar'>
            <Link to="/">Home</Link>
            <Link to="/account">Account</Link>
            <Link to="/browse">Browse Campaigns</Link>
            <Link to="/login">Log in</Link>
        </nav>
    )
};

export default NavBar;