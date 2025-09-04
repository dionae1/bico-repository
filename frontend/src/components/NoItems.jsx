function NoItems({ item }) {
    return (
        <div className="text-center py-10">
            <h2 className="text-xl text-slate-700">No {item} found</h2>
        </div>
    );
}

export default NoItems;
