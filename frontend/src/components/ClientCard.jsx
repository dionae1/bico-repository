import { FaEdit } from "react-icons/fa";
import { formatPhoneNumber } from "../services/util";
import { FaDeleteLeft } from "react-icons/fa6";

function ClientCard({ client }) {
    return (
        <div className="border p-4 rounded-md">
            <div className="grid grid-cols-[1fr_auto] gap-4 mt-1 p-1">
                <div className="">
                    <span className="block text-xl">{client.name}</span>
                    <span className="block">Email: {client.email}</span>
                    <span className="block">Phone: {formatPhoneNumber(client.phone)}</span>
                    <span className="block">Address: {client.address}</span>
                </div>

                <div className="flex space-y-4 justify-end flex-col">
                    <button className="text-white text-center text-xl bg-blue-400 p-2 rounded-md hover:bg-blue-500 transition-colors cursor-pointer w-12 flex items-center justify-center">
                        <FaEdit />
                    </button>
                    <button className="text-white font-bold text-center text-xl bg-red-400 p-2 rounded-md hover:bg-red-500 transition-colors cursor-pointer w-12 flex items-center justify-center">
                        <FaDeleteLeft />
                    </button>
                </div>
            </div>

        </div>
    );
}

export default ClientCard;