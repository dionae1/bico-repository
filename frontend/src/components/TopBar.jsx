import Button from "./Button";
import { FaReact } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { logout } from "../services/auth";

const buttons = [
    {
        title: 'Home'
    },
    {
        title: 'Services'
    },
    {
        title: 'Clients'
    },
    {
        title: 'Suppliers'
    },
];

function TopBar() {

    const handleLogout = () => {
        logout();
        window.location.href = "/";
    };

    return (
        <div className="flex items-center p-1 pl-5 bg-rose-400">
            <div className="flex items-center">
                <FaReact className="text-2xl text-white mr-2" />
                <h1 className="text-xl text-white font-bold">CSM</h1>
            </div>
            <div className="flex space-x-8 m-auto mb-1 mt-1">
                {buttons.map((button, i) => (
                    <Button
                        key={button.title}
                        title={button.title}
                    />
                ))}
            </div>
            <Button title={<FaArrowRightToBracket className="text-2xl text-white mr-2"/>} func={handleLogout}/>
        </div>
    );
}

export default TopBar;