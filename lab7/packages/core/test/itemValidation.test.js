import test from "node:test";
import assert from "node:assert/strict";
import { validateItem, MAX_TITLE_LENGTH, ERROR_EMPTY_TITLE, ERROR_INVALID_PRICE } from "../itemValidation.js";

test("Коректний товар проходить валідацію", () => {
    const res = validateItem("Зошит 48 арк.", 35);
    assert.equal(res.isValid, true);
    assert.equal(res.error, null);
});

test("Порожня назва або пробіли відхиляються", () => {
    assert.deepEqual(validateItem("   ", 50), { isValid: false, error: ERROR_EMPTY_TITLE });
    assert.deepEqual(validateItem(null, 50), { isValid: false, error: ERROR_EMPTY_TITLE });
});

test("Назва на межі MAX_TITLE_LENGTH та MAX_TITLE_LENGTH + 1", () => {
    const exact = "А".repeat(MAX_TITLE_LENGTH);
    const tooLong = "А".repeat(MAX_TITLE_LENGTH + 1);

    assert.equal(validateItem(exact, 100).isValid, true);
    assert.equal(validateItem(tooLong, 100).isValid, false);
});

test("Некоректна ціна відхиляється", () => {
    assert.deepEqual(validateItem("Ручка", 0), { isValid: false, error: ERROR_INVALID_PRICE });
    assert.deepEqual(validateItem("Ручка", -15), { isValid: false, error: ERROR_INVALID_PRICE });
    assert.deepEqual(validateItem("Ручка", "abc"), { isValid: false, error: ERROR_INVALID_PRICE });
});