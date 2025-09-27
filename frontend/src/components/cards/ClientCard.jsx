import { FaEdit } from "react-icons/fa";
import { formatPhoneNumber } from "../../services/util";
import { FaDeleteLeft } from "react-icons/fa6";
import api from "../../api/client";
import { useNavigate } from "react-router-dom";

function ClientCard({ client, refreshClients }) {

    const navigate = useNavigate();

    const handleDelete = () => {
        api.delete(`/clients/${client.id}`)
            .then(() => {
                refreshClients();
            })
            .catch((error) => {
                console.error("Error deleting client:", error);
            });
    }

    const handleView = () => {
        navigate(`/clients/view/${client.id}`);
    }

    return (
        <div className="border p-4 rounded-md">
            <div className="grid grid-cols-[1fr_auto] gap-4 mt-1 p-1">
                <div>
                    <h3 className="text-lg font-semibold">{client.name}</h3>
                    <p className="text-sm text-gray-600">Email: {client.email}</p>
                    <p className="text-sm text-gray-600">Phone: {formatPhoneNumber(client.phone)}</p>
                    <p className="text-sm text-gray-600">Address: {client.address}</p>
                </div>

                <div className="flex space-y-4 justify-end flex-col">
                    <button onClick={handleView} className="text-white text-center text-xl bg-blue-500 p-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer w-10 flex items-center justify-center">
                        <FaEdit />
                    </button>
                    <button onClick={handleDelete} className="text-white font-bold text-center text-xl bg-red-500 p-2 rounded-md hover:bg-red-800 transition-colors cursor-pointer w-10 flex items-center justify-center">
                        <FaDeleteLeft />
                    </button>
                </div>
            </div>

        </div>
    );
}

export default ClientCard;