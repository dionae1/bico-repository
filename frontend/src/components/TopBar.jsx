import Button from "./Button";
import { useState } from "react";
import { FaReact } from "react-icons/fa";

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

function TopBar(){
    const [activeButton, setActiveButton] = useState(null);

    return (
        <div className="flex items-center p-4 bg-rose-400">
            <div className="flex items-center">
                <FaReact className="text-2xl text-white mr-2" />
                <h1 className="text-xl text-white font-bold">CSM</h1>
            </div>
            <div className="flex space-x-6 m-auto mb-1 mt-1">
                {buttons.map((button, i) => (
                    <Button
                        key={button.title}
                        title={button.title}
                    />
                ))}
            </div>
        </div>
    );
}

export default TopBar;