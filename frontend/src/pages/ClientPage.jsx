import ClientForm from "../components/ClientForm";
import ClientCard from "../components/ClientCard";
import { use, useEffect, useState } from "react";
import api from "../api/client";

function ClientPage() {
    const [clients, setClients] = useState([]);

    const fetchClients = async () => {
        try {
            const response = await api.get("/clients");
            setClients(response.data.data);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);


    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Client Management</h1>
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                {clients.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No clients found.</p>
                ) : (
                    <ul className="space-y-4">
                        {clients.map(client => (
                            <li key={client.id}>
                                <ClientCard client={client} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Client</h2>
                <ClientForm onClientAdded={fetchClients} />
            </div>
        </div>
    );
}

export default ClientPage;