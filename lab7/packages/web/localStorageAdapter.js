import { StorageAdapter } from "@papercraft/core";

export class LocalStorageAdapter extends StorageAdapter {
    constructor(storage = globalThis.localStorage, key = "papercraft-items") {
        super();
        this.storage = storage;
        this.key = key;
    }

    async load() {
        try {
            const raw = this.storage.getItem(this.key);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    async save(items) {
        this.storage.setItem(this.key, JSON.stringify(items));
    }
}