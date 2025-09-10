import { FaSignOutAlt } from "react-icons/fa";

function FormButton({ title, func }) {
    const baseStyles = "w-full font-semibold text-center py-3 px-4 rounded-xl transition-all duration-300 cursor-pointer text-white hover:scale-102";
    const colors = "bg-gradient-to-r from-green-400 to-lime-500 hover:from-green-500 hover:to-lime-500"

    return (
        <button
            onClick={func}
            className={baseStyles + " " + colors}
        >
            <div className="flex items-center justify-center">
                <span>{title}</span>
            </div>
        </button>
    );
}

export default FormButton;
