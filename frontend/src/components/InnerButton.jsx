function InnerButton({title}) {
    return (
        <button className="text-white font-bold text-center w-2/5 bg-rose-200 p-2 m-2 mt-1 ml-3 rounded-xl mb-3 shadow-sm hover:bg-rose-300 transition-colors cursor-pointer">
            {title}
        </button>
    );
}

export default InnerButton;
