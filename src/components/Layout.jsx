import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import Hero from "./hero/Hero.jsx";

function Layout() {
    return (
        <div>
            <NavBar />
            <Outlet />
            <footer>hi</footer>
        </div>
    );
}

export default Layout;