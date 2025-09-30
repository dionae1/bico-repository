import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { formatPhoneNumber } from "../../services/util";
import ConfirmModal from "../modals/ConfirmModal";
import api from "../../api/client";

function ClientCard({ client, refreshClients }) {

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                    <h3 className="text-lg font-semibold">{client.name}</h3>
                    <p className="text-sm text-gray-600">Email: {client.email}</p>
                    <p className="text-sm text-gray-600">Phone: {formatPhoneNumber(client.phone)}</p>
                    <p className="text-sm text-gray-600">Address: {client.address}</p>
                </div>

                <div className="flex space-y-4 justify-end flex-col">
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
                        message={`Are you sure you want to delete client - ${client.name}? This action cannot be undone.`}
                    />
                </div>
            </div>

        </div>
    );
}

export default ClientCard;