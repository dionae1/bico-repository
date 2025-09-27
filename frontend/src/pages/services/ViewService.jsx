import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";

import api from "../../api/client";
import FormInput from "../../components/FormInput";

function ViewService() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [service, setService] = useState(null);
    const [serviceName, setServiceName] = useState("")
    const [serviceDescription, setServiceDescription] = useState("")
    const [servicePrice, setServicePrice] = useState("")
    const [serviceCost, setServiceCost] = useState("")
    const [servicePeriodicity, setServicePeriodicity] = useState("")

    const isValid = serviceName && serviceDescription && servicePrice && serviceCost && servicePeriodicity

    const fetchService = async () => {
        try {
            const response = await api.get(`/services/${id}`);
            const { data } = response.data;
            setService(data);

            setServiceName(data.name || "");
            setServiceDescription(data.description || "");
            setServicePrice(data.price || "");
            setServiceCost(data.cost || "");
            setServicePeriodicity(data.periodicity || "");
        } catch (error) {
            console.error("Error fetching service:", error);
        }
    }

    const updateService = async () => {
        try {
            const response = await api.put(`/services/${id}`, {
                name: serviceName,
                description: serviceDescription,
                price: servicePrice,
                cost: serviceCost,
                periodicity: servicePeriodicity
            });
        } catch (error) {
            console.error("Error updating service:", error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValid) {
            updateService();
            navigate("/services");
        }
    }

    useEffect(() => {
        if (id) {
            fetchService();
        }
    }, [id]);

    if (!service) return <p>Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">View Service</h1>
            <BackButton />
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 my-4 flex flex-col space-y-4">
                <FormInput
                    id="serviceName"
                    label="Name"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    required
                />
                <FormInput
                    id="serviceDescription"
                    label="Description"
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                    required
                />
                <FormInput
                    id="servicePrice"
                    label="Price"
                    type="number"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                    required
                />
                <FormInput
                    id="serviceCost"
                    label="Cost"
                    type="number"
                    value={serviceCost}
                    onChange={(e) => setServiceCost(e.target.value)}
                    required
                />
                <select name="servicePeriodicity" id="servicePeriodicity" value={servicePeriodicity} onChange={e => setServicePeriodicity(e.target.value)} required>
                    <option value="" disabled>Select periodicity</option>
                    <option value="one-time">One-time</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
                <button type="submit" disabled={!isValid} className={`w-full text-white font-bold text-center text-xl p-2 rounded-md transition-colors cursor-pointer
                ${isValid ? 'bg-green-600 hover:bg-green-500' : 'bg-gray-400 cursor-not-allowed'}`}>
                    Confirm Changes
                </button>
            </form>

        </div>
    );
}

export default ViewService;