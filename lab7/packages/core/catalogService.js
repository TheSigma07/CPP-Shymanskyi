import { validateItem } from "./itemValidation.js";
import { createItem, sortItemsByDate, filterItemsByQuery, sanitizeItems } from "./itemUtils.js";

export class CatalogService {
    constructor(adapter) {
        this.adapter = adapter;
    }

    async list(query = "") {
        const raw = await this.adapter.load();
        const clean = sanitizeItems(raw);
        const filtered = filterItemsByQuery(clean, query);
        return sortItemsByDate(filtered);
    }

    async add(title, price, icon = "📦") {
        const validation = validateItem(title, price);
        if (!validation.isValid) {
            return { ok: false, error: validation.error };
        }

        const raw = await this.adapter.load();
        const items = sanitizeItems(raw);
        const newItem = createItem(title, price, icon);
        items.push(newItem);

        await this.adapter.save(items);
        return { ok: true, item: newItem };
    }

    async remove(id) {
        const raw = await this.adapter.load();
        const items = sanitizeItems(raw);
        const initialLength = items.length;
        const updated = items.filter(item => item.id !== id);

        if (updated.length === initialLength) {
            return { ok: false, error: "Товар не знайдено." };
        }

        await this.adapter.save(updated);
        return { ok: true };
    }

    async toggleCart(id) {
        const raw = await this.adapter.load();
        const items = sanitizeItems(raw);
        const target = items.find(item => item.id === id);

        if (!target) {
            return { ok: false, error: "Товар не знайдено." };
        }

        target.inCart = !target.inCart;
        await this.adapter.save(items);
        return { ok: true, item: target };
    }
}