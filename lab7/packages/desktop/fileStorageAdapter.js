import fs from "node:fs/promises";
import path from "node:path";
import { StorageAdapter } from "@papercraft/core";

export class FileStorageAdapter extends StorageAdapter {
    constructor(filePath) {
        super();
        this.filePath = filePath;
    }

    async load() {
        try {
            const content = await fs.readFile(this.filePath, "utf-8");
            const parsed = JSON.parse(content);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    async save(items) {
        const dir = path.dirname(this.filePath);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(this.filePath, JSON.stringify(items, null, 2), "utf-8");
    }
}