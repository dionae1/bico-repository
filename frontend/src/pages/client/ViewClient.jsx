import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";

import api from "../../api/client";
import FormInput from "../../components/FormInput";


function ViewClient() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [client, setClient] = useState(null);
    const [clientName, setClientName] = useState("")
    const [clientEmail, setClientEmail] = useState("")
    const [clientPhone, setClientPhone] = useState("")
    const [clientAddress, setClientAddress] = useState("")

    const isValid = clientName && clientEmail && clientPhone && clientAddress

    const fetchClient = async () => {
        try {
            const response = await api.get(`/clients/${id}`);
            const { data } = response.data;
            setClient(data);

            setClientName(data.name || "");
            setClientEmail(data.email || "");
            setClientPhone(data.phone || "");
            setClientAddress(data.address || "");
        } catch (error) {
            console.error("Error fetching client:", error);
        }
    };

    const updateClient = async () => {
        try {
            const response = await api.put(`/clients/${id}`, {
                name: clientName,
                email: clientEmail,
                phone: clientPhone,
                address: clientAddress
            });

            setClient(response.data);
        } catch (error) {
            console.error("Error updating client:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValid) {
            updateClient();
            navigate("/clients");
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
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Manage your Clients</h1>
            <BackButton />
            <form onSubmit={e => handleSubmit(e)} className="bg-white shadow-lg rounded-lg p-6 my-4 flex flex-col space-y-2">
                <h2 className="text-xl font-semibold text-gray-800 text-center">Change the info below to update the client.</h2>

                <FormInput
                    id="clientName"
                    label="Name"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    required
                />
                <FormInput
                    id="clientEmail"
                    label="Email"
                    value={clientEmail}
                    onChange={e => setClientEmail(e.target.value)}
                    required
                />
                <FormInput
                    id="clientPhone"
                    label="Phone"
                    value={clientPhone}
                    onChange={e => setClientPhone(e.target.value)}
                    required
                />
                <FormInput
                    id="clientAddress"
                    label="Address"
                    value={clientAddress}
                    onChange={e => setClientAddress(e.target.value)}
                    required
                />
                <button type="submit" disabled={!isValid} className={`w-full text-white font-bold text-center text-xl p-2 rounded-md transition-colors cursor-pointer
                ${isValid ? 'bg-green-600 hover:bg-green-500' : 'bg-gray-400 cursor-not-allowed'}`}>
                    Confirm Changes
                </button>
            </form>
        </div>
    )
}

export default ViewClient;