import { logout } from "../services/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaReact, FaHome, FaCog, FaUsers, FaTruck, FaSignOutAlt } from "react-icons/fa";

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


function TopBar() {

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="flex items-center p-1 pl-5 bg-green-400 shadow-md/20 border-b-2 border-green-500 fixed top-0 w-full">
            <div className="flex items-center">
                <FaReact className="text-2xl text-white mr-1" />
                <h1 className="text-xl text-white font-bold">CSM</h1>
            </div>
            <div className="flex space-x-8 m-auto mb-1 mt-1">
                {items.map((item, i) => {
                    const isActive = item.path === location.pathname;
                    const icon = <item.icon className="inline-block mr-2" />;

                    return (
                        <Link key={item.title} to={item.path} className={`text-white text-xl p-2 rounded-md transition-colors duration-75 hover:shadow-xs ${isActive ? 'bg-green-600' : 'hover:bg-green-500'}`}>
                            {icon}
                            {item.title}
                        </Link>
                    );
                })}
            </div>
            <div className="w-14 p-1">
                <button onClick={handleLogout} className="flex items-center justify-center w-full h-full text-white p-2 rounded-lg cursor-pointer hover:bg-green-500 transition-transform">
                    <FaSignOutAlt className="text-2xl" />
                </button>
            </div>
        </div>
    );
}

export default TopBar;