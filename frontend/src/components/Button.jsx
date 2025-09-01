import InnerButton from './InnerButton';

function Button({ title, isActive, func }) {

    return (
        <>
            <button
                onClick={func}
                className={`text-white font-bold text-center text-xl bg-rose-400 p-2 rounded-md hover:bg-rose-500 transition-colors cursor-pointer
                ${isActive ? 'bg-rose-600' : ''}`}
            >
                {title}
            </button >
        </>

    );
}

export default Button;
