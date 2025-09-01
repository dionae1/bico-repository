import InnerButton from './InnerButton';

function Button({ title, onToggle, isActive }) {

    return (
        <>
            <button
                onClick={onToggle}
                className={`text-white font-bold text-center text-xl w-full bg-rose-400 p-3 rounded-xl hover:bg-rose-600 transition-colors cursor-pointer
    ${isActive ? 'bg-rose-600' : ''}`}
            >
                {title}
            </button >
        </>

    );
}

export default Button;
