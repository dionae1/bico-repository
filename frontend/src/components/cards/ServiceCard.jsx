import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
import api from "../../api/client";

function ServiceCard({ service, refreshServices }) {
    const navigate = useNavigate();

    const handleDelete = () => {
        api
            .delete(`/services/${service.id}`)
            .then(() => {
                refreshServices();
            })
            .catch((error) => {
                console.error("Error deleting service:", error);
            });
    };

    const handleView = () => {
        navigate(`/services/view/${service.id}`);
    };

    return (
        <div className="border p-4 rounded-md">
            <div className="grid grid-cols-[1fr_auto] gap-4 mt-1 p-1">
                <div>
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                    <p className="text-sm text-gray-600">Price: U${service.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Cost: U${service.cost.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Periodicity: {service.periodicity}</p>
                </div>

                <div className="flex space-y-4 justify-around my-2 flex-col">
                    <button onClick={handleView} className="text-white text-center text-xl bg-blue-500 p-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer w-10 flex items-center justify-center">
                        <FaEdit />
                    </button>
                    <button onClick={handleDelete} className="text-white font-bold text-center text-xl bg-red-500 p-2 rounded-md hover:bg-red-800 transition-colors cursor-pointer w-10 flex items-center justify-center">
                        <FaDeleteLeft />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard;