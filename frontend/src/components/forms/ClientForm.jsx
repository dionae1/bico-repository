import FormInput from "../FormInput"
import FormButton from "../buttons/FormButton"
import api from "../../api/client"
import { useState } from "react"
function ClientForm({ onClientCreated }) {


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
                'name': clientName,
                'email': clientEmail,
                'phone': clientPhone,
                'address': clientAddress
            };

            await api.post("/clients/", newClient);
            clearFields();

            if (onClientCreated) {
                onClientCreated();
            }

        } catch (error) {
            console.error("Error adding client:", error);
        }
    };

    const clearFields = () => {
        setClientName("");
        setClientEmail("");
        setClientPhone("");
        setClientAddress("");
    };

    return (
        <div className="m-auto rounded-lg bg-white">
            <form onSubmit={e => handleSubmit(e)} className="flex flex-col justify-center m-auto my-4 space-y-2">
                <FormInput
                    id="clientName"
                    label="Name"
                    placeholder="Jonas Kahnwald"
                    required
                    onChange={e => setClientName(e.target.value)} value={clientName}
                />
                <FormInput
                    id="clientEmail"
                    label="Email"
                    placeholder="jonas1@example.com"
                    required
                    onChange={e => setClientEmail(e.target.value)} value={clientEmail}
                />
                <FormInput
                    id="clientPhone"
                    label="Phone"
                    placeholder="(99) 91234-5678"
                    required
                    onChange={e => setClientPhone(e.target.value)} value={clientPhone}
                />
                <FormInput
                    id="clientAddress"
                    label="Address"
                    placeholder="Street 1, House 3, Downtown."
                    required
                    onChange={e => setClientAddress(e.target.value)} value={clientAddress}
                />

                <FormButton title="Add Client" onClick={handleSubmit} isValid={isValid} />
            </form>
        </div>
    )
}

export default ClientForm;