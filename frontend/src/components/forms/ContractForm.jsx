import FormInput from "../FormInput";
import FormButton from "../buttons/FormButton";
import api from "../../api/client";

import { useState, useEffect, use } from "react";
import { Link } from "react-router-dom";

function ContractForm({ onContractCreated }) {
    const [clientId, setClientId] = useState("");
    const [serviceId, setServiceId] = useState("");
    const [created_at, setCreatedAt] = useState("");
    const [end_at, setEndAt] = useState("");
    const [value, setValue] = useState("");

    const [services, setServices] = useState([]);
    const [clients, setClients] = useState([]);

    const isValid = clientId && serviceId && created_at && end_at && value;

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get("/services/");
                const { data } = response.data;
                setServices(data);
            } catch (error) {
                if (error.response.data.message !== "No services found") {
                    console.error("Error fetching services:", error);
                }
            }
        };
        fetchServices();
    }, []);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await api.get("/clients/");
                const { data } = response.data;
                setClients(data);
            } catch (error) {
                if (error.response.data.message !== "No clients found") {
                    console.error("Error fetching clients:", error);
                }
            }
        };
        fetchClients();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValid) return;

        try {
            const newContract = {
                'client_id': clientId,
                'service_id': serviceId,
                'created_at': created_at,
                'end_at': end_at,
                'value': value
            }

            await api.post("/contracts/", newContract);
            clearFields();

            if (onContractCreated) {
                onContractCreated();
            }
        } catch (error) {
            console.error("Error adding contract:", error);
        }
    }

    const clearFields = () => {
        setClientId("");
        setServiceId("");
        setCreatedAt("");
        setEndAt("");
        setValue("");
    }

    return (
        <div className="m-auto rounded-lg bg-white">
            <form onSubmit={e => handleSubmit(e)} className="flex flex-col justify-center m-auto">
                <FormInput
                    id="contractValue"
                    label="Value $"
                    type="number"
                    placeholder="U$9.90"
                    required
                    onChange={e => setValue(e.target.value)} value={value}
                />

                <FormInput
                    id="contractCreatedAt"
                    label="Start date"
                    type="date"
                    required
                    onChange={e => setCreatedAt(e.target.value)} value={created_at}
                />

                <div className="flex flex-row space-x-1 -mt-4 mb-6">
                    <input type="checkbox" name="useToday" id="useToday" onChange={e => {
                        if (e.target.checked) {
                            setCreatedAt(new Date().toISOString().split("T")[0]);
                        } else {
                            setCreatedAt("");
                        }
                    }} />
                    <label htmlFor="useToday">Use today's date</label>
                </div>

                <FormInput
                    id="contractEndAt"
                    label="End date"
                    type="date"
                    required
                    onChange={e => setEndAt(e.target.value)} value={end_at}
                />

                <div className="mb-6 mt-4 space-y-3">
                    <label htmlFor="serviceId" className="text-2xl">Service to link</label>
                    <select name="serviceId" id="serviceId" value={serviceId} onChange={e => {
                        setServiceId(e.target.value)
                        const selectedService = services.find(s => s.id === parseInt(e.target.value));
                        if (selectedService) {
                            setValue(selectedService.price.toFixed(2));
                        }
                    }} className="mt-1 p-2 border border-gray-300 rounded w-full" required>
                        <option value="">Select a service</option>
                        {services.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6 space-y-3">
                    <label htmlFor="clientId" className="text-2xl">Client to link</label>
                    <select name="clientId" id="clientId" value={clientId} onChange={e => setClientId(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded w-full" required>
                        <option value="">Select a client</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>

                <FormButton title="Add Contract" onClick={handleSubmit} isValid={isValid} />
            </form>
        </div>
    )
}

export default ContractForm;