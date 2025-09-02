import { FaSignOutAlt } from "react-icons/fa";

function Button({ title, isActive, func, variant = "default" }) {
    
    const getButtonStyles = () => {
        const baseStyles = "w-full font-semibold text-center py-3 px-4 rounded-xl transition-all duration-300 cursor-pointer";
        
        switch (variant) {
            case "logout":
                return `${baseStyles} 
                    bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 
                    text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 pl-2`;

            case "login":
                return `${baseStyles} 
                    bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 
                    text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95`;

            default:
                return `${baseStyles} 
                    ${isActive 
                        ? 'bg-white/90 text-pink-600 shadow-lg scale-105' 
                        : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:scale-105'
                    }
                    hover:shadow-lg active:scale-95`;
        }
    };

    return (
        <button
            onClick={func}
            className={getButtonStyles()}
        >
            <div className="flex items-center justify-center">
                {variant === "logout" && <FaSignOutAlt className="mr-2 text-sm" />}
                <span>{title}</span>
            </div>
        </button>
    );
}

export default Button;
