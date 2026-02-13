import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar"
import Footer from "./components/Footer/Footer";

function Layout() {
    return (
        <div className="app-wrapper">
        <NavBar />
        <main className="main-content h-30 mb-30">
        <Outlet />
        </main>
        <Footer />
        </div>
    );
}

export default Layout;