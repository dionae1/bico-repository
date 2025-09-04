import ClientForm from "../../components/ClientForm";
import { useNavigate } from "react-router-dom";
import { FaBackward } from "react-icons/fa";

function CreateClient() {
    const navigate = useNavigate();

    const handleClientCreated = () => {
        navigate("/clients");
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Manage your Clients</h1>

            <button className="flex justify-center items-center p-2 transition-colors duration-200 cursor-pointer hover:text-white hover:bg-emerald-400 rounded text-lg" onClick={() => navigate(-1)}>
                <FaBackward className="mr-2" />
                Back to Clients
            </button>

            <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
                <h2 className="text-xl font-semibold text-gray-800 text-center">Fill the form to create a new client.</h2>
                <ClientForm onClientCreated={handleClientCreated} />
            </div>
        </div>);
}

export default CreateClient;