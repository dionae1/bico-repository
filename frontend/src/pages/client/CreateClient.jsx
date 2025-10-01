import ClientForm from "../../components/forms/ClientForm";
import BackButton from "../../components/buttons/BackButton";

import { useNavigate } from "react-router-dom";

function CreateClient() {
    const navigate = useNavigate();

    const handleClientCreated = () => {
        navigate(-1);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Manage your Clients</h1>
            <BackButton />

            <div className="bg-white shadow-lg rounded-lg p-6 mt-2">
                <h2 className="text-xl font-semibold text-gray-800 text-center">Fill the form to create a new client.</h2>
                <ClientForm onClientCreated={handleClientCreated} />
            </div>
        </div>);
}

export default CreateClient;