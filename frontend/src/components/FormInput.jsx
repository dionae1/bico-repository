function FormInput({ id, label, placeholder, type = "text", value, required = false, onChange, disable = false }) {
    return (
        <div>
            <label htmlFor={id} className="text-2xl mb-2">
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className="mb-6 p-2 border border-gray-300 rounded w-full"
                value={value}
                onChange={onChange}
                required={required}
                disabled={disable}
            />
        </div>
    );
}

export default FormInput;