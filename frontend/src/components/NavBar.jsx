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

function NavBar() {
    const [activeButton, setActiveButton] = useState(null);

    return (
        <div className="flex min-h-screen shadow-md">
            <aside className="w-64 bg-violet-100 flex-shrink-0 flex flex-col h-full shadow-md/20 border-r-2 border-violet-200">
                <div className="flex items-center justify-center">
                    <FaReact className="text-4xl text-violet-500 mt-6 mr-2 hover:text-violet-600 transition-colors duration-200" />
                    <h1 className="text-2xl text-center text-white text-shadow-lg/10 mt-6 font-bold">CSM</h1>
                </div>
                <nav className="w-full pt-4 p-6 mt-4 flex-grow">
                    <ul>
                        {buttons.map((button, i) => (
                            <Button
                                key={button.title}
                                title={button.title}
                                onToggle={() => setActiveButton(activeButton === i ? null : i)}
                                isActive={activeButton === i}
                                color="bg-rose-400"
                                hoverColor="bg-rose-500"
                            />
                        ))}
                    </ul>
                </nav>
                <div className="p-4 mt-auto">
                    <Button title="Logout" color="bg-rose-400" hoverColor="bg-rose-500" />
                </div>
            </aside>
        </div>
    );
}

export default NavBar;
