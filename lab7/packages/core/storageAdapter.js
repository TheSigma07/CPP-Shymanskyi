export class StorageAdapter {
    async load() {
        throw new Error("Метод load() не реалізовано");
    }

    async save(items) {
        throw new Error("Метод save() не реалізовано");
    }
}

export class MemoryStorageAdapter extends StorageAdapter {
    constructor(initialData = []) {
        super();
        this.data = [...initialData];
    }

    async load() {
        return [...this.data];
    }

    async save(items) {
        this.data = [...items];
    }
}