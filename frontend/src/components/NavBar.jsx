import Button from "./Button";
import { useState } from "react";
import { FaReact, FaHome, FaCog, FaUsers, FaTruck, FaHeart, FaOutdent } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { logout } from "../services/auth";

const items = [
    {
        title: 'Home',
        path: '/home',
        icon: FaHome
    },
    {
        title: 'Services',
        path: '/services',
        icon: FaCog
    },
    {
        title: 'Clients',
        path: '/clients',
        icon: FaUsers
    },
    {
        title: 'Suppliers',
        path: '/suppliers',
        icon: FaTruck
    },
];

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <aside className="w-64 bg-gradient-to-b from-pink-300 via-rose-300 to-pink-400 flex-shrink-0 flex flex-col shadow-xl sticky top-0 h-screen overflow-hidden">
            {/* Cute decorative elements */}
            <div className="absolute top-4 right-4 opacity-20">
                <FaHeart className="text-pink-200 text-lg animate-pulse" />
            </div>
            <div className="absolute bottom-20 left-4 opacity-15">
                <FaHeart className="text-rose-200 text-sm animate-bounce" style={{ animationDelay: '1s' }} />
            </div>

            {/* Header */}
            <div className="flex items-center justify-center mt-6 mb-2 px-4">
                <div className="p-3 shadow-xs">
                    <FaOutdent className="text-3xl text-white" />
                </div>
                <div className="ml-3">
                    <h1 className="text-2xl text-white font-extrabold tracking-wide drop-shadow-lg">CSM</h1>
                    <p className="text-xs text-pink-100 font-medium">Services Manager</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-grow px-3 mt-4">
                <ul className="space-y-2">
                    {items.map((item, i) => {
                        const IconComponent = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <li key={item.title}>
                                <Link
                                    to={item.path}
                                    className={`
                                        flex items-center px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
                                        ${isActive
                                            ? 'bg-white/30 backdrop-blur-sm shadow-lg transform scale-105'
                                            : 'hover:bg-white/20 hover:backdrop-blur-sm hover:transform hover:translate-x-1'
                                        }
                                    `}
                                >
                                    <IconComponent className={`
                                        text-lg mr-3 transition-all duration-300
                                        ${isActive
                                            ? 'text-white drop-shadow-md'
                                            : 'text-pink-100 group-hover:text-white group-hover:transform group-hover:scale-110'
                                        }
                                    `} />
                                    <span className={`
                                        font-semibold transition-all duration-300
                                        ${isActive
                                            ? 'text-white drop-shadow-md'
                                            : 'text-pink-100 group-hover:text-white'
                                        }
                                    `}>
                                        {item.title}
                                    </span>
                                    {isActive && (
                                        <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse shadow-lg" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 mt-auto">
                <Button title="Logout" variant="logout" func={handleLogout} />
            </div>
        </aside>
    );
}

export default NavBar;