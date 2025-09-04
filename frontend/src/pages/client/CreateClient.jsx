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
            <button className="mb-4 p-3 rounded-xl transition-colors duration-200 flex items-center cursor-pointer hover:bg-emerald-400 hover:text-white" onClick={() => navigate(-1)}>
                <FaBackward className="mr-2" />
                Back to Clients
            </button>
            <div className="bg-white shadow-lg rounded-lg p-6 ">
                <h2 className="text-xl font-semibold text-gray-800">Fill the form to create a new client.</h2>
                <ClientForm onClientCreated={handleClientCreated} />
            </div>
        </div>);
}

export default CreateClient;