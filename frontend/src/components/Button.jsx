import { FaSignOutAlt } from "react-icons/fa";

function Button({ title, func }) {
    const baseStyles = "w-full font-semibold text-center py-3 px-4 rounded-xl transition-all duration-300 cursor-pointer bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95";

    return (
        <button
            onClick={func}
            className={baseStyles}
        >
            <div className="flex items-center justify-center">
                <span>{title}</span>
            </div>
        </button>
    );
}

export default Button;
