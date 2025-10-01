import ContractForm from "../../components/forms/ContractForm";
import BackButton from "../../components/buttons/BackButton";

import { useNavigate } from "react-router-dom";

function CreateContract() {
    const navigate = useNavigate();

    const handleContractCreated = () => {
        navigate(-1);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Manage your Contracts</h1>
            <BackButton />

            <div className="bg-white shadow-lg rounded-lg p-6 mt-2">
                <h2 className="text-xl font-semibold text-gray-800 text-center">Fill the form to create a new contract.</h2>
                <ContractForm onContractCreated={handleContractCreated} />
            </div>
        </div>
    );
}

export default CreateContract;