import { useState } from "react";

function StationeryForm({ onAdd }) {
    const [text, setText] = useState("");
    const [price, setPrice] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const added = onAdd(text, price);

        if (added) {
            setText("");
            setPrice("");
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
        >
            <h3 className="mb-3 text-base font-semibold text-slate-700">
                ➕ Додати новий товар у каталог:
            </h3>

            <div className="flex flex-wrap items-center gap-3">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Введіть назву (напр. Ножиці, Зошит, Ручка)..."
                    className="flex-1 min-w-[240px] rounded-lg border border-slate-300 py-2.5 px-4 text-sm focus:border-emerald-500 focus:outline-none bg-white"
                />

                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ціна (грн)..."
                    className="w-32 rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none bg-white"
                />

                <button
                    type="submit"
                    className="cursor-pointer rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                    Додати товар
                </button>
            </div>
        </form>
    );
}

export default StationeryForm;