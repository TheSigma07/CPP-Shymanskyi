export function createItem(title, price, icon = "📦") {
    return {
        id: Date.now() + Math.floor(Math.random() * 10000),
        title: title.trim(),
        price: Number(price),
        icon,
        inCart: false,
        createdAt: new Date().toISOString()
    };
}

export function formatItemDate(isoString) {
    if (!isoString || typeof isoString !== "string") return "";
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

export function sortItemsByDate(items) {
    return [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function filterItemsByQuery(items, query = "") {
    const q = String(query).trim().toLowerCase();
    if (!q) return [...items];
    return items.filter(item => item.title.toLowerCase().includes(q));
}

export function sanitizeItems(rawItems) {
    if (!Array.isArray(rawItems)) return [];
    return rawItems.filter(
        item =>
            item &&
            typeof item === "object" &&
            typeof item.id === "number" &&
            typeof item.title === "string" &&
            item.title.trim().length > 0 &&
            typeof item.price === "number" &&
            item.price > 0
    );
}