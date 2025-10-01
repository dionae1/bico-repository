import { useState, useEffect } from "react";
import { capitalize } from "../services/util";
import api from "../api/client";

function HomePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get("/users/me");
            setUser(response.data.data);
        };
        fetchData();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mt-8">
                Welcome back, {capitalize(user?.name)}!
            </h1>

            <div className="flex flex-col md:flex-row gap-4 mt-8">
                <div className="mt-8 bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors duration-200 w-full md:w-1/2 text-center">
                    <p>Create a new contract</p>
                </div>
                <div className="mt-8 bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors duration-200 w-full md:w-1/2 text-center">
                    <p>Last contract created</p>
                </div>
            </div>



            <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Dashboard</h2>
                <p className="text-gray-600">
                    Use the navigation menu to manage your clients, services.
                </p>
            </div>
        </div>
    );
}

export default HomePage;
