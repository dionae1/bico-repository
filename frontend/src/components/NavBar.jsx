import Button from "./Button";
import { FaHome, FaCog, FaUsers, FaTruck, FaLeaf, FaOutdent } from "react-icons/fa";
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
        <aside className="w-64 bg-gradient-to-b from-slate-100 via-slate-200 flex-shrink-0 flex flex-col shadow-xl sticky top-0 h-screen overflow-hidden border-r border-slate-300">
            <div className="absolute top-10 right-4 opacity-80">
                <FaLeaf className="text-emerald-400 text-lg animate-pulse" />
            </div>
            <div className="absolute bottom-20 left-4 opacity-80">
                <FaLeaf className="text-emerald-400 text-sm animate-bounce" style={{ animationDelay: '1s' }} />
            </div>

            {/* Header */}
            <div className="text-center my-6">
                <h1 className="text-2xl text-slate-700 font-bold tracking-wide">CSM</h1>
                <p className="text-xs text-slate-500 font-medium">Services Manager</p>
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
                                            ? 'bg-green-100 shadow-md border border-green-200'
                                            : 'hover:bg-slate-100 hover:shadow-sm'
                                        }
                                    `}
                                >
                                    <IconComponent className={`
                                        text-lg mr-3 transition-all duration-300
                                        ${isActive
                                            ? 'text-emerald-600'
                                            : 'text-slate-600 group-hover:text-emerald-500'
                                        }
                                    `} />
                                    <span className={`
                                        font-medium transition-all duration-300
                                        ${isActive
                                            ? 'text-emerald-700 font-semibold'
                                            : 'text-slate-600 group-hover:text-slate-700'
                                        }
                                    `}>
                                        {item.title}
                                    </span>
                                    {isActive && (
                                        <div className="absolute right-2 w-2 h-2 bg-emerald-500 rounded-full shadow-sm" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 mt-auto">
                <button className="w-full py-2 px-4 bg-emerald-400 text-white rounded-lg hover:bg-emerald-500 hover:cursor-pointer transition duration-200" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </aside>
    );
}

export default NavBar;