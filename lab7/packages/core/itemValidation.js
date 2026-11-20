export const MAX_TITLE_LENGTH = 100;
export const ERROR_EMPTY_TITLE = 'Назва товару не може бути порожньою.';
export const ERROR_NO_LETTERS_TITLE = 'Назва товару повинна містити хоча б одну літеру.';
export const ERROR_LONG_TITLE = `Назва товару не повинна перевищувати ${MAX_TITLE_LENGTH} символів.`;
export const ERROR_INVALID_PRICE = 'Ціна повинна бути додатнім числом.';

export function validateItem(title, price) {
    const cleanTitle = String(title ?? '').trim();

    if (!cleanTitle) {
        return { valid: false, error: ERROR_EMPTY_TITLE };
    }

    // Перевірка, що назва містить хоча б одну літеру (кирилиця або латиниця)
    if (!/\p{L}/u.test(cleanTitle)) {
        return { valid: false, error: ERROR_NO_LETTERS_TITLE };
    }

    if (cleanTitle.length > MAX_TITLE_LENGTH) {
        return { valid: false, error: ERROR_LONG_TITLE };
    }

    const numPrice = Number(price);
    if (!Number.isFinite(numPrice) || numPrice <= 0) {
        return { valid: false, error: ERROR_INVALID_PRICE };
    }

    return { valid: true, error: null };
}