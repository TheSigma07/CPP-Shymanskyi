import test from "node:test";
import assert from "node:assert/strict";
import { MemoryStorageAdapter, CatalogService } from "@papercraft/core";
import { createHandlers } from "../ipcHandlers.js";

test("IPC обробники: додавання, пошук, відхилення некоректних типів та видалення", async () => {
    const service = new CatalogService(new MemoryStorageAdapter());
    const handlers = createHandlers(service);

    const badAdd = await handlers.add({ title: 123, price: 50 });
    assert.equal(badAdd.ok, false);

    const okAdd = await handlers.add({ title: "Блокнот А5", price: 85 });
    assert.equal(okAdd.ok, true);

    const list = await handlers.list("блокнот");
    assert.equal(list.length, 1);
    assert.ok(list[0].dateLabel);

    const badDel = await handlers.remove("not-a-number");
    assert.equal(badDel.ok, false);

    const okDel = await handlers.remove(okAdd.item.id);
    assert.equal(okDel.ok, true);
});