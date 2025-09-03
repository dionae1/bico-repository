import Button from "./Button";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaReact, FaHome, FaCog, FaUsers, FaTruck, FaHeart, FaOutdent } from "react-icons/fa";
import { logout } from "../services/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";

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
        <div className="flex items-center p-1 pl-5 bg-rose-400 shadow-md/20 border-b-2 border-rose-500 fixed top-0 w-full">
            <div className="flex items-center">
                <FaReact className="text-2xl text-white mr-1" />
                <h1 className="text-xl text-white font-bold">CSM</h1>
            </div>
            <div className="flex space-x-8 m-auto mb-1 mt-1">
                {items.map((item, i) => {
                    const isActive = item.path === location.pathname;
                    const icon = <item.icon className="inline-block mr-2" />;

                    return (
                        <Link key={item.title} to={item.path} className={`text-white text-xl p-2 rounded-md hover:bg-rose-500 transition-colors duration-200 hover:shadow-xs hover:scale-105 active:scale-95 ${isActive ? 'bg-rose-500' : ''}`}>
                            {icon}
                            {item.title}
                        </Link>
                    );
                })}
            </div>
            <div className="w-14 p-1">
                <Button title={<FaArrowRightToBracket className="text-2xl text-white box-content" />} func={handleLogout} />
            </div>
        </div>
    );
}

export default TopBar;