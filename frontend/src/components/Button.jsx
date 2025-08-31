import InnerButton from './InnerButton';

function Button({ title, onToggle, isActive }) {

    return (
        <>
            <button
                onClick={onToggle}
                className="text-white font-bold text-center text-xl w-full bg-rose-200 p-3 rounded-xl mb-4 shadow-sm hover:bg-rose-300 transition-colors cursor-pointer"
            >
                {title}
            </button>

            {
                isActive && <>
                    <InnerButton title="Create" />
                    <InnerButton title="Manage" />
                </>
            }
        </>

    );
}

export default Button;
