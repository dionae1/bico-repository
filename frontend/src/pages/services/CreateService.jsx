import ServiceForm from "../../components/forms/ServiceForm";
import BackButton from "../../components/BackButton";

import { useNavigate } from "react-router-dom";

function CreateService() {
    const navigate = useNavigate();

    const handleServiceCreated = () => {
        navigate(-1);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Manage your Contracts</h1>
            <BackButton />

            <div className="bg-white shadow-lg rounded-lg p-6 mt-2">
                <h2 className="text-xl font-semibold text-gray-800 text-center">Fill the form to create a new contract.</h2>
                <ServiceForm onServiceCreated={handleServiceCreated} />
            </div>
        </div>
    );
}

export default CreateService;