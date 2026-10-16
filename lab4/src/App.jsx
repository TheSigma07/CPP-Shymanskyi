import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import StationeryForm from "./components/StationeryForm.jsx";
import StationeryList from "./components/StationeryList.jsx";

const STORAGE_KEY = "papercraft_items";
const STORAGE_CART_KEY = "papercraft_cart";

function getAutoIcon(text) {
    const lower = text.toLowerCase();
    if (lower.includes("ножиц")) return "✂️";
    if (lower.includes("ручк")) return "🖊️";
    if (lower.includes("зошит")) return "📓";
    if (lower.includes("маркер")) return "🖍️";
    if (lower.includes("альбом")) return "🎨";
    if (lower.includes("олів")) return "✏️";
    if (lower.includes("щоденник")) return "📔";
    if (lower.includes("скріпок") || lower.includes("затискач")) return "📎";
    if (lower.includes("лінійк")) return "📏";
    if (lower.includes("папір") || lower.includes("блокнот")) return "📄";
    return "📝";
}

function loadNotes() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.length > 0) return parsed;
        }
    } catch {
        // Помилка зчитування
    }

    return [
        { id: 1, text: "Зошит 48 арк.", price: 35, icon: "📓", done: false },
        { id: 2, text: "Набір гелевих ручок", price: 120, icon: "🖊️", done: false },
        { id: 3, text: "Маркери для виділення (4 шт)", price: 95, icon: "🖍️", done: false },
        { id: 4, text: "Альбом для малювання", price: 65, icon: "🎨", done: false },
        { id: 5, text: "Набір кольорових олівців", price: 140, icon: "✏️", done: false },
        { id: 6, text: "Щоденник датований", price: 210, icon: "📔", done: false },
        { id: 7, text: "Ножиці канцелярські", price: 50, icon: "✂️", done: false },
        { id: 8, text: "Набір скріпок та затискачів", price: 40, icon: "📎", done: false },
    ];
}

function loadCart() {
    try {
        const saved = localStorage.getItem(STORAGE_CART_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

function App() {
    const [notes, setNotes] = useState(loadNotes);
    const [cart, setCart] = useState(loadCart);
    const [message, setMessage] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [expDate, setExpDate] = useState("");
    const [cvv, setCvv] = useState("");

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }, [notes]);

    useEffect(() => {
        localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
    }, [cart]);

    function addNote(text, price) {
        const trimmedText = text.trim();

        if (trimmedText === "") {
            setMessage({ text: "Введіть назву канцтовару.", type: "error" });
            return false;
        }

        const newNote = {
            id: Date.now(),
            text: trimmedText,
            price: price ? Number(price) : 0,
            icon: getAutoIcon(trimmedText),
            done: false,
        };

        setNotes([newNote, ...notes]);
        setMessage({ text: "Канцтовар додано до каталогу.", type: "success" });
        setTimeout(() => setMessage(null), 3000);
        return true;
    }

    function toggleNote(id) {
        setNotes(
            notes.map((note) =>
                note.id === id ? { ...note, done: !note.done } : note
            )
        );
    }

    function deleteNote(id) {
        setNotes(notes.filter((note) => note.id !== id));
        setMessage({ text: "Канцтовар видалено.", type: "success" });
        setTimeout(() => setMessage(null), 3000);
    }

    function addToCart(note) {
        setCart((prevCart) => [...prevCart, { ...note, cartId: Date.now() }]);
        setMessage({ text: `"${note.text}" додано в кошик!`, type: "success" });
        setTimeout(() => setMessage(null), 3000);
    }

    function removeFromCart(cartId) {
        setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
    }

    function handlePaymentSubmit(e) {
        e.preventDefault();
        alert("Оплату успішно здійснено! Дякуємо за замовлення!");
        setCart([]);
        setIsModalOpen(false);
        setCardNumber("");
        setExpDate("");
        setCvv("");
    }

    const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
    const doneCount = notes.filter((note) => note.done).length;

    return (
        <div className="min-h-screen bg-emerald-50 text-slate-800">
            <Header total={notes.length} done={doneCount} />

            <main className="mx-auto max-w-4xl px-4 py-8">
                <section id="features" className="mb-10">
                    <h2 className="mb-6 text-center text-2xl font-bold text-[#2b5876]">
                        Наші переваги та функції:
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="rounded-xl border-t-4 border-[#2b5876] bg-white p-5 shadow-sm">
                            <h3 className="mb-2 text-base font-bold text-[#4e4376]">📚 Великий асортимент</h3>
                            <p className="text-xs text-slate-600">Зошити, ручки, маркери від світових брендів.</p>
                        </div>
                        <div className="rounded-xl border-t-4 border-[#2b5876] bg-white p-5 shadow-sm">
                            <h3 className="mb-2 text-base font-bold text-[#4e4376]">🔍 Зручний пошук</h3>
                            <p className="text-xs text-slate-600">Швидка фільтрація за ціною та категоріями.</p>
                        </div>
                        <div className="rounded-xl border-t-4 border-[#2b5876] bg-white p-5 shadow-sm">
                            <h3 className="mb-2 text-base font-bold text-[#4e4376]">🚚 Швидка доставка</h3>
                            <p className="text-xs text-slate-600">Відправка замовлень у день оформлення.</p>
                        </div>
                        <div className="rounded-xl border-t-4 border-[#2b5876] bg-white p-5 shadow-sm">
                            <h3 className="mb-2 text-base font-bold text-[#4e4376]">💳 Безпечна оплата</h3>
                            <p className="text-xs text-slate-600">Оплата карткою на сайті або при отриманні.</p>
                        </div>
                    </div>
                </section>

                <section id="catalog" className="mb-10 rounded-2xl bg-white p-6 shadow-lg">
                    <StationeryForm onAdd={addNote} />

                    {message && (
                        <p
                            className={
                                message.type === "error"
                                    ? "mb-4 text-center font-bold text-rose-600"
                                    : "mb-4 text-center font-bold text-emerald-700"
                            }
                        >
                            {message.text}
                        </p>
                    )}

                    <StationeryList
                        notes={notes}
                        onToggle={toggleNote}
                        onDelete={deleteNote}
                        onAddToCart={addToCart}
                    />

                    <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h3 className="mb-3 text-lg font-bold text-slate-800">🛒 Ваш кошик</h3>
                        {cart.length === 0 ? (
                            <p className="text-sm italic text-slate-400">Кошик порожній</p>
                        ) : (
                            <div className="mb-4 max-h-48 overflow-y-auto divide-y divide-slate-200">
                                {cart.map((item) => (
                                    <div key={item.cartId} className="flex items-center justify-between py-2 text-sm">
                                        <span className="font-medium text-slate-700">{item.icon || "📝"} {item.text}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-emerald-600">{item.price} грн</span>
                                            <button
                                                onClick={() => removeFromCart(item.cartId)}
                                                className="font-bold text-rose-500 hover:text-rose-700"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3">
                            <p className="text-sm font-bold text-slate-700">
                                Всього товарів: {cart.length} | Сума: <span className="text-emerald-600">{cartTotal} грн</span>
                            </p>
                            <button
                                disabled={cart.length === 0}
                                onClick={() => setIsModalOpen(true)}
                                className="cursor-pointer rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Оформити замовлення та оплатити 💳
                            </button>
                        </div>
                    </div>
                </section>

                <section id="tech-stack" className="mb-10 rounded-2xl bg-white p-6 shadow-md">
                    <h2 className="mb-2 text-xl font-bold text-slate-800">
                        🛠️ Стек технологій та їх роль у проєкті
                    </h2>
                    <p className="mb-4 text-xs text-slate-500">
                        Технології, використані при розробці застосунку PaperCraft SPA:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <h3 className="mb-1 text-sm font-bold text-slate-800">⚛️ React (SPA)</h3>
                            <p className="mb-1 text-xs font-semibold text-blue-600">Компонентний підхід</p>
                            <p className="text-xs text-slate-600">Управління станом через useState та useEffect.</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <h3 className="mb-1 text-sm font-bold text-slate-800">🎨 Tailwind CSS v4</h3>
                            <p className="mb-1 text-xs font-semibold text-blue-600">Стилізація та адаптивність</p>
                            <p className="text-xs text-slate-600">Утилітарний CSS-фреймворк для швидкого дизайну.</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <h3 className="mb-1 text-sm font-bold text-slate-800">⚡ Vite</h3>
                            <p className="mb-1 text-xs font-semibold text-blue-600">Збирач проєкту</p>
                            <p className="text-xs text-slate-600">Швидка розробка та гаряче оновлення сторінки.</p>
                        </div>
                    </div>
                </section>

                <section id="about" className="rounded-2xl bg-white p-6 text-center shadow-md">
                    <h2 className="mb-2 text-xl font-bold text-[#2b5876]">Про наш магазин</h2>
                    <p className="mx-auto max-w-xl text-sm text-slate-600">
                        Ми надаємо найкращі канцтовари для школи, університету та офісу за доступними цінами з швидкою доставкою по всій Україні.
                    </p>
                </section>
            </main>

            <footer className="mt-8 bg-slate-200 py-4 text-center text-xs text-slate-600">
                &copy; 2026 PaperCraft SPA. Всі права захищено.
            </footer>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-2xl font-bold text-slate-400 hover:text-slate-600"
                        >
                            &times;
                        </button>
                        <h2 className="mb-2 text-center text-xl font-bold text-[#2b5876]">
                            Оплата замовлення 💳
                        </h2>
                        <p className="mb-5 text-center text-sm text-slate-600">
                            Сума до сплати: <strong className="text-base text-emerald-600">{cartTotal} грн</strong>
                        </p>

                        <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Номер картки (16 цифр)"
                                maxLength="16"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                                className="rounded-lg border border-slate-300 p-2.5 text-sm"
                            />
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="ММ/РР"
                                    maxLength="5"
                                    value={expDate}
                                    onChange={(e) => setExpDate(e.target.value)}
                                    required
                                    className="w-1/2 rounded-lg border border-slate-300 p-2.5 text-sm"
                                />
                                <input
                                    type="password"
                                    placeholder="CVV"
                                    maxLength="3"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    required
                                    className="w-1/2 rounded-lg border border-slate-300 p-2.5 text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-2 cursor-pointer rounded-lg bg-emerald-600 py-2.5 text-base font-bold text-white hover:bg-emerald-700"
                            >
                                Оплатити зараз
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;