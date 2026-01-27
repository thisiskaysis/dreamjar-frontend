import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";

function Layout() {
    return (
        <div>
            <NavBar />
            <Outlet />
        <footer>by Kaycee Lawrence</footer>
        </div>
    );
}

export default Layout;