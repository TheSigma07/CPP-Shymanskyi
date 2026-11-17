import test from "node:test";
import assert from "node:assert/strict";
import { MemoryStorageAdapter } from "../storageAdapter.js";
import { CatalogService } from "../catalogService.js";

test("Додавання коректного товару та унікальність id", async () => {
    const service = new CatalogService(new MemoryStorageAdapter());
    const r1 = await service.add("Маркер", 45);
    const r2 = await service.add("Скріпки", 25);

    assert.equal(r1.ok, true);
    assert.equal(r2.ok, true);
    assert.notEqual(r1.item.id, r2.item.id);
});

test("Відхилення порожнього товару", async () => {
    const service = new CatalogService(new MemoryStorageAdapter());
    const res = await service.add("", 50);
    assert.equal(res.ok, false);
});

test("Видалення наявного та відсутнього товару", async () => {
    const service = new CatalogService(new MemoryStorageAdapter());
    const added = await service.add("Альбом", 70);

    const delOk = await service.remove(added.item.id);
    assert.equal(delOk.ok, true);

    const delFail = await service.remove(999999);
    assert.equal(delFail.ok, false);
});

test("Перемикання стану кошика toggleCart", async () => {
    const service = new CatalogService(new MemoryStorageAdapter());
    const added = await service.add("Ножиці", 60);

    const toggled = await service.toggleCart(added.item.id);
    assert.equal(toggled.ok, true);
    assert.equal(toggled.item.inCart, true);
});