function FormButton({ title, onClick, isValid = true }) {
    const validStyle = "bg-emerald-400 text-white hover:bg-emerald-500 hover:cursor-pointer";
    const invalidStyle = "bg-gray-400 cursor-not-allowed";
    
    return (
        <button
            onClick={onClick}
            className={`w-full py-2 text-white rounded-lg transition duration-200 ${isValid ? validStyle : invalidStyle}`}
            disabled={!isValid}
        >
            <div className="flex items-center justify-center">
                <span>{title}</span>
            </div>
        </button>
    );
}

export default FormButton;
