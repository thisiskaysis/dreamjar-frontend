import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";

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