import hero from '../assets/images/hero.png';
import { FaHandshake, FaCloud, FaChartLine } from "react-icons/fa6";
import { useState } from 'react';
import { Link } from 'react-router-dom';

function WelcomePage() {

    return (
        <div className="h-screen bg-emerald-50">

            <h1 className="text-5xl font-bold text-center pt-20 text-slate-800">Welcome to Bico</h1>
            <p className="text-center text-2xl text-slate-600 mt-4">Your freelancer services management system</p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-4 w-1/2 h-auto mx-auto'>
                <img src={hero} alt="Hero" className={`h-full w-full max-w-4/5`} />

                <div className='flex flex-col justify-center h-full space-y-6 mt-16 text-xl px-4'>
                    <div className="flex items-center p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-all duration-300">
                        <FaChartLine className="text-emerald-500 text-2xl mr-4 flex-shrink-0" /> 
                        <span className="text-slate-700">Smart reports - Visualize metrics in real time.</span>
                    </div>
                    <div className="flex items-center p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-all duration-300">
                        <FaHandshake className="text-emerald-500 text-2xl mr-4 flex-shrink-0" /> 
                        <span className="text-slate-700">Client, services, contracts management - Manage data, subscriptions, and order history.</span>
                    </div>
                    <div className="flex items-center p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-all duration-300">
                        <FaCloud className="text-emerald-500 text-2xl mr-4 flex-shrink-0" /> 
                        <span className="text-slate-700">Access anywhere - Everything in the cloud, available 24/7.</span>
                    </div>

                    <div className='flex space-x-4 mt-8 justify-evenly'>
                        <Link to="/signup" className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold">Sign up</Link>
                        <Link to="/login" className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-3 rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;
