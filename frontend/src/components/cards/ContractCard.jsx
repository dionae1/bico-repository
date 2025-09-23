import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
import api from "../../api/client";

function ContractCard({ contract, refreshContracts }) {

    const navigate = useNavigate();


    const handleDelete = () => {
        api.delete(`/contracts/${contract.id}`)
            .then(() => {
                refreshContracts();
            })
            .catch((error) => {
                console.error("Error deleting contract:", error);
            });
    }

    const handleView = () => {
        navigate(`/contracts/view/?id=${contract.id}`);
    }


    return (
        <div className="border p-4 rounded-md">
            <div className="grid grid-cols-[1fr_auto] gap-4 mt-1 p-1">
                <div>
                    <h3 className="text-lg font-semibold">{contract.client.name} - {contract.service.name}</h3>
                    <p className="text-sm text-gray-600">Start date: {new Date(contract.created_at).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">End date: {new Date(contract.end_at).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">Value: U$ {contract.value.toFixed(2)}</p>
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
    );
}

export default ContractCard;