function StationeryItem({ note, onToggle, onDelete, onAddToCart }) {
    return (
        <li
            className={
                note.done
                    ? "flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-slate-200 p-3.5 shadow-sm transition"
                    : "flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-emerald-100 p-3.5 shadow-sm transition"
            }
        >
            {/* Ліва частина: Чекбокс + Іконка + Назва */}
            <label className="flex flex-1 cursor-pointer items-center gap-3">
                <input
                    type="checkbox"
                    className="h-4 w-4 shrink-0 accent-emerald-600"
                    checked={note.done}
                    onChange={() => onToggle(note.id)}
                />
                <span className="text-2xl shrink-0">{note.icon || "📝"}</span>
                <span
                    className={
                        note.done
                            ? "break-words font-medium text-slate-500 line-through"
                            : "break-words font-medium text-slate-800"
                    }
                >
          {note.text}
        </span>
            </label>

            {/* Права частина: Ціна + Кнопки (на мобільних вирівнюються в рядок знизу) */}
            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-300/50">
                {note.price !== undefined && note.price !== null && (
                    <span
                        className={
                            note.done
                                ? "rounded-md bg-slate-300 px-2.5 py-1 text-xs font-bold text-slate-600 line-through"
                                : "rounded-md bg-emerald-200 px-2.5 py-1 text-xs font-bold text-emerald-900"
                        }
                    >
            {note.price} грн
          </span>
                )}

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => onAddToCart(note)}
                        className="cursor-pointer rounded-lg bg-[#2b5876] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#4e4376]"
                    >
                        У кошик
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(note.id)}
                        className="cursor-pointer rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-rose-700"
                    >
                        Видалити
                    </button>
                </div>
            </div>
        </li>
    );
}

export default StationeryItem;
