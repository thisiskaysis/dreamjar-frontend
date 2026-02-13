import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar"

function Layout() {
    return (
        <>
        <NavBar />
        <div className="h-30" />
        <Outlet />
        </>
    );
}

export default Layout;