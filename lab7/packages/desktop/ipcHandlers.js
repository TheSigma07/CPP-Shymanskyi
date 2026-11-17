import { formatItemDate } from "@papercraft/core";

export function createHandlers(service) {
    return {
        list: async (query) => {
            const q = typeof query === "string" ? query : "";
            const items = await service.list(q);
            return items.map(item => ({
                ...item,
                dateLabel: formatItemDate(item.createdAt)
            }));
        },
        add: async (payload) => {
            if (!payload || typeof payload !== "object") {
                return { ok: false, error: "Некоректні дані" };
            }
            const title = typeof payload.title === "string" ? payload.title : "";
            const price = payload.price;
            return await service.add(title, price);
        },
        remove: async (id) => {
            if (typeof id !== "number") {
                return { ok: false, error: "Некоректний ідентифікатор" };
            }
            return await service.remove(id);
        },
        toggleCart: async (id) => {
            if (typeof id !== "number") {
                return { ok: false, error: "Некоректний ідентифікатор" };
            }
            return await service.toggleCart(id);
        }
    };
}