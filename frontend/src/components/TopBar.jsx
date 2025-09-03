import Button from "./Button";
import { FaReact } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { logout } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";

const buttons = ['Home', 'Services', 'Clients', 'Suppliers'];

function TopBar() {

    const navigate = useNavigate();

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
                {buttons.map((button, i) => (
                    <Link key={button} to={`/${button.toLowerCase()}`} className="text-white text-xl p-2 rounded-md hover:bg-rose-500 transition-colors duration-200 hover:shadow-xs hover:scale-105 active:scale-95">
                        {button}
                    </Link>
                ))}
            </div>
            <div className="w-14 p-1">
                <Button title={<FaArrowRightToBracket className="text-2xl text-white box-content" />} func={handleLogout}/>
            </div>
        </div>
    );
}

export default TopBar;