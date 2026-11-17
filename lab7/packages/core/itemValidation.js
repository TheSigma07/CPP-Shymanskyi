export const MAX_TITLE_LENGTH = 500;
export const ERROR_EMPTY_TITLE = "Назва товару не може бути порожньою.";
export const ERROR_TOO_LONG_TITLE = `Назва товару не повинна перевищувати ${MAX_TITLE_LENGTH} символів.`;
export const ERROR_INVALID_PRICE = "Ціна товару повинна бути додатним числом.";

export function validateItem(title, price) {
    if (typeof title !== "string") {
        return { isValid: false, error: ERROR_EMPTY_TITLE };
    }

    const trimmedTitle = title.trim();
    if (trimmedTitle.length === 0) {
        return { isValid: false, error: ERROR_EMPTY_TITLE };
    }

    if (trimmedTitle.length > MAX_TITLE_LENGTH) {
        return { isValid: false, error: `Назва товару не повинна перевищувати ${MAX_TITLE_LENGTH} символів.` };
    }

    const numericPrice = Number(price);
    if (price === "" || price === null || Number.isNaN(numericPrice) || numericPrice <= 0) {
        return { isValid: false, error: ERROR_INVALID_PRICE };
    }

    return { isValid: true, error: null };
}