import test from "node:test";
import assert from "node:assert/strict";
import { formatItemDate, sortItemsByDate, filterItemsByQuery, sanitizeItems } from "../itemUtils.js";

test("Формати дати: валідна та некоректна дати", () => {
    assert.equal(formatItemDate("2026-11-16T10:00:00.000Z"), "16.11.2026");
    assert.equal(formatItemDate("invalid-date"), "");
    assert.equal(formatItemDate(null), "");
});

test("Сортування за датою (новіші спочатку) без зміни вихідного масиву", () => {
    const items = [
        { id: 1, title: "Старий", price: 10, createdAt: "2026-01-01T10:00:00Z" },
        { id: 2, title: "Новий", price: 20, createdAt: "2026-05-01T10:00:00Z" }
    ];
    const sorted = sortItemsByDate(items);
    assert.equal(sorted[0].id, 2);
    assert.equal(items[0].id, 1);
});

test("Пошук без урахування регістру", () => {
    const items = [
        { id: 1, title: "Пенал шкільний", price: 100 },
        { id: 2, title: "Зошит в клітинку", price: 30 }
    ];
    const found = filterItemsByQuery(items, "ПЕНАЛ");
    assert.equal(found.length, 1);
    assert.equal(found[0].id, 1);
});

test("sanitizeItems відкидає пошкоджені записи", () => {
    const dirty = [
        { id: 1, title: "Олівець", price: 15 },
        { id: "bad", title: "Помилка", price: 10 },
        { id: 2, title: "", price: 20 },
        null
    ];
    const clean = sanitizeItems(dirty);
    assert.equal(clean.length, 1);
});