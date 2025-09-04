import ClientCard from "../../components/ClientCard";
import NoItems from "../../components/NoItems";
import Button from "../../components/Button";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";

function ClientPage() {
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchClients = async () => {
        try {
            const response = await api.get("/clients");
            const { data } = response.data;
            setClients(data);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };


    const filteredClients = useMemo(() => {
        return clients.filter(client =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [clients, searchTerm]);


    useEffect(() => {
        fetchClients();
    }, []);


    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Manage your Clients</h1>

            <div className="mb-6 w-2/4 m-auto">
                <Button title="Register new Client" func={() => { navigate("/clients/new"); }}></Button>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <div className="text-center mb-4">
                    <p className="text-2xl mb-4">Search</p>
                    <input
                        type="text"
                        placeholder="Search by name"
                        className="border border-black rounded-lg p-2 w-full"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }}
                    />
                </div>

                {filteredClients.length === 0 ? (
                    <NoItems item="clients" />
                ) : (
                    <ul className="space-y-4">
                        {filteredClients.map(client => (
                            <li key={client.id}>
                                <ClientCard client={client} refreshClients={fetchClients} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default ClientPage;