import TopBar from "../TopBar";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="flex flex-col h-screen">
            <TopBar />
            <main className="flex-1 pt-20">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;