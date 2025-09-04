import hero from '../assets/images/hero.png';
import { FaHandshake, FaCloud, FaChartLine } from "react-icons/fa6";
import { useState } from 'react';
import { Link } from 'react-router-dom';

function WelcomePage() {
    const [isZoomed, setIsZoomed] = useState(false);

    const handleZoom = () => {
        setIsZoomed(true);
    };

    const handleLeave = () => {
        setIsZoomed(false);
    };

    return (
        <div className="h-screen bg-gray-100">

            <h1 className="text-5xl font-bold text-center pt-20">WELCOME TO CSM</h1>
            <p className="text-center text-2xl text-gray-600 mt-4">Your freelancer services management system</p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 px-4 w-1/2 h-auto mx-auto'>
                <img src={hero} alt="Hero" onMouseEnter={handleZoom} className={`h-full w-full max-w-3/5 transition-all duration-500 ${isZoomed ? 'scale-140' : 'scale-100'}`} />

                <div className='flex flex-col justify-center h-full space-y-4 mt-16 text-lg px-4'>
                    <p><FaChartLine className="inline-block mr-2" /> Smart reports - Visualize metrics in real time.</p>
                    <p><FaHandshake className="inline-block mr-2" /> Client, services, contracts management - Manage data, subscriptions, and order history.</p>
                    <p><FaCloud className="inline-block mr-2" /> Access anywhere - Everything in the cloud, available 24/7.</p>

                    <div className='flex space-x-4 mt-6 justify-evenly'>
                        <Link to="/signup" className="text-green-400 p-2 border-2 rounded-lg hover:bg-green-400 hover:text-white transition-colors duration-200">Sign up</Link>
                        <Link to="/login" className="text-green-400 p-2 border-2 rounded-lg hover:bg-green-400 hover:text-white transition-colors duration-200">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;
