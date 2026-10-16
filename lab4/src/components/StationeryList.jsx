import StationeryItem from "./StationeryItem.jsx";

function StationeryList({ notes, onToggle, onDelete, onAddToCart }) {
    if (!notes || notes.length === 0) {
        return (
            <p className="py-4 text-center text-slate-500">
                Каталог порожній. Додайте перший товар!
            </p>
        );
    }

    return (
        <ul className="space-y-3">
            {notes.map((note) => (
                <StationeryItem
                    key={note.id}
                    note={note}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onAddToCart={onAddToCart}
                />
            ))}
        </ul>
    );
}

export default StationeryList;