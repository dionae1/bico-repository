import useQuery from "../../hooks/useQuery";
import { useEffect, useState } from "react";
import api from "../../api/client";
import ClientCard from "../../components/ClientCard";

function ViewClient() {
    const [client, setClient] = useState(null);
    const id = useQuery().get("id");

    const fetchClient = async () => {
        try {
            const response = await api.get(`/clients/${id}`);
            const { data } = response.data;
            setClient(data);
        } catch (error) {
            console.error("Error fetching client:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchClient();
        }
    }, [id]);

    if (!client) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <ClientCard client={client} />
        </div>
    )
}

export default ViewClient;