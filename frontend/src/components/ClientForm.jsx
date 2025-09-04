import Button from "../components/Button"
import api from "../api/client"
import { useState } from "react"
function ClientForm({ onClientAdded }) {


    const [clientName, setClientName] = useState("")
    const [clientEmail, setClientEmail] = useState("")
    const [clientPhone, setClientPhone] = useState("")
    const [clientAddress, setClientAddress] = useState("")

    const isValid = clientName && clientEmail && clientPhone && clientAddress

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValid) return;

        try {
            const newClient = {
                name: clientName,
                email: clientEmail,
                phone: clientPhone,
                address: clientAddress
            };

            await api.post("/clients/", newClient);

            setClientName("");
            setClientEmail("");
            setClientPhone("");
            setClientAddress("");

            if (onClientAdded) {
                onClientAdded();
            }

        } catch (error) {
            console.error("Error adding client:", error);
        }
    };

    return (
        <div className="m-auto shadow-lg/10 p-6 rounded-lg bg-white">
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col justify-center m-auto mb-10 mt-10 space-y-6">

                <label htmlFor="clientName">Client Name</label>
                <input type="text" id="clientName" placeholder="Client Name" required onChange={(e) => setClientName(e.target.value)} value={clientName}
                    className="border border-gray-300 p-2 rounded-md" />

                <label htmlFor="clientEmail">Client Email</label>
                <input type="email" id="clientEmail" placeholder="Client Email" required onChange={(e) => setClientEmail(e.target.value)} value={clientEmail}
                    className="border border-gray-300 p-2 rounded-md" />

                <label htmlFor="clientPhone">Client Phone</label>
                <input type="text" id="clientPhone" placeholder="Client Phone" required onChange={(e) => setClientPhone(e.target.value)} value={clientPhone}
                    className="border border-gray-300 p-2 rounded-md" />

                <label htmlFor="clientAddress">Client Address</label>
                <input type="text" id="clientAddress" placeholder="Client Address" required onChange={(e) => setClientAddress(e.target.value)} value={clientAddress}
                    className="border border-gray-300 p-2 rounded-md" />

                <button type="submit" disabled={!isValid} className={`text-white font-bold text-center text-xl p-2 rounded-md transition-colors cursor-pointer
                ${isValid ? 'bg-green-600 hover:bg-green-500' : 'bg-gray-400 cursor-not-allowed'}`}>
                    Add Client
                </button>
            </form>
        </div>
    )
}

export default ClientForm;