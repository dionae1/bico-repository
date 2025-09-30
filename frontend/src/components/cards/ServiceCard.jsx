import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import ConfirmModal from "../modals/ConfirmModal";
import api from "../../api/client";

function ServiceCard({ service, refreshServices }) {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleConfirmDelete = () => {
        handleDelete();
        closeModal();
    }

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
                    <button onClick={openModal} className="text-white font-bold text-center text-xl bg-red-500 p-2 rounded-md hover:bg-red-800 transition-colors cursor-pointer w-10 flex items-center justify-center">
                        <FaDeleteLeft />
                    </button>

                    <ConfirmModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        onConfirm={handleConfirmDelete}
                        title="Confirm Deletion"
                        message={`Are you sure you want to delete service - ${service.name}? This action cannot be undone.`}
                    />
                </div>
            </div>
        </div>
    )
}

export default ServiceCard;