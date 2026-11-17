import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { FileStorageAdapter } from "../fileStorageAdapter.js";

test("Відсутній файл повертає порожній масив", async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "papercraft-"));
    const adapter = new FileStorageAdapter(path.join(tmpDir, "missing.json"));
    assert.deepEqual(await adapter.load(), []);
});

test("Запис у файл створює теку та зчитує дані", async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "papercraft-"));
    const filePath = path.join(tmpDir, "nested", "data.json");
    const adapter = new FileStorageAdapter(filePath);

    await adapter.save([{ id: 1, title: "Зошит", price: 30 }]);
    const loaded = await adapter.load();
    assert.equal(loaded.length, 1);
    assert.equal(loaded[0].title, "Зошит");
});