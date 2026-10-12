// Тимчасове сховище користувачів та товарів магазину канцелярії "PaperCraft".
// Дані зберігаються в оперативній пам'яті й зникають після перезапуску сервера.

export const users = [];
export const products = [];

let nextUserId = 1;
let nextProductId = 1;

// Повертає новий унікальний id користувача у вигляді рядка
export function getNextUserId() {
    const id = String(nextUserId);
    nextUserId += 1;
    return id;
}

// Повертає новий унікальний id канцелярії/товару у вигляді рядка
export function getNextProductId() {
    const id = String(nextProductId);
    nextProductId += 1;
    return id;
}

