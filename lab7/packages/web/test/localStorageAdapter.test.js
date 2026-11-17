import test from "node:test";
import assert from "node:assert/strict";
import { LocalStorageAdapter } from "../localStorageAdapter.js";
import { CatalogService } from "@papercraft/core";

function createMockStorage() {
    const map = new Map();
    return {
        getItem: (k) => (map.has(k) ? map.get(k) : null),
        setItem: (k, v) => map.set(k, v)
    };
}

test("Порожнє сховище повертає порожній масив", async () => {
    const adapter = new LocalStorageAdapter(createMockStorage());
    assert.deepEqual(await adapter.load(), []);
});

test("Пошкоджений JSON не ламає адаптер", async () => {
    const mock = createMockStorage();
    mock.setItem("papercraft-items", "{bad-json");
    const adapter = new LocalStorageAdapter(mock);
    assert.deepEqual(await adapter.load(), []);
});

test("Запис і читання через CatalogService", async () => {
    const service = new CatalogService(new LocalStorageAdapter(createMockStorage()));
    await service.add("Пенал", 120);
    const items = await service.list();
    assert.equal(items.length, 1);
    assert.equal(items[0].title, "Пенал");
});