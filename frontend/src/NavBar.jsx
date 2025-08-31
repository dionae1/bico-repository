import Button from "./components/Button";
import { useState } from 'react';


const buttons = ['Services', 'Clients', 'Suppliers'];

function NavBar() {
    const [open, setOpen] = useState(null);

    return (
        <div className="flex min-h-screen shadow-md">
            <aside className="w-64 bg-rose-100 flex-shrink-0 flex flex-col h-full">
                <nav className="w-full pt-4 p-6 mt-4 flex-grow">
                    <ul>
                        <Button title="Home" onToggle={() => setOpen(null)} />
                        {buttons.map((button, i) => (
                            <Button
                                key={button}
                                title={button}
                                isActive={open === i}
                                onToggle={() => setOpen(open === i ? null : i)}
                            />
                        ))}
                    </ul>
                </nav>
                <div className="p-4 mt-auto">
                    <Button title="Logout" onToggle={() => setOpen(null)} />
                </div>
            </aside>
        </div>
    );
}

export default NavBar;
