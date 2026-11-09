// renderer/script.js
// Логіка рендер-процесу десктопного застосунку PaperCraft Mobile.

const itemTitle = document.getElementById("itemTitle");
const itemPrice = document.getElementById("itemPrice");
const addItemBtn = document.getElementById("addItemBtn");
const resetCatalogBtn = document.getElementById("resetCatalogBtn");
const itemList = document.getElementById("itemList");
const message = document.getElementById("message");

const filterAll = document.getElementById("filterAll");
const filterAvailable = document.getElementById("filterAvailable");
const cartContent = document.getElementById("cartContent");
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Елементи модального вікна оплати
const paymentModal = document.getElementById("paymentModal");
const modalPaySum = document.getElementById("modalPaySum");
const payBtnAmount = document.getElementById("payBtnAmount");
const paySubmitBtn = document.getElementById("paySubmitBtn");
const cancelPayBtn = document.getElementById("cancelPayBtn");
const closePayModalCross = document.getElementById("closePayModalCross");
const paymentStatus = document.getElementById("paymentStatus");

let appState = {
    items: [],
    cart: [],
    filter: "all"
};

// Початковий каталог із точними іконками для кожного товару
const INITIAL_ITEMS = [
    { id: "1", title: "Набір скріпок та затискачів", price: 40, icon: "📎", done: false },
    { id: "2", title: "Ножиці канцелярські", price: 50, icon: "✂️", done: false },
    { id: "3", title: "Щоденник датований", price: 210, icon: "📙", done: false },
    { id: "4", title: "Набір кольорових олівців", price: 140, icon: "✏️", done: false },
    { id: "5", title: "Альбом для малювання", price: 65, icon: "🎨", done: false },
    { id: "6", title: "Маркери для виділення (4 шт)", price: 95, icon: "🖍️", done: false },
    { id: "7", title: "Набір гелевих ручок", price: 120, icon: "🖊️", done: false },
    { id: "8", title: "Зошит 48 арк.", price: 35, icon: "📓", done: false }
];

// Автоматичний підбір іконки на основі назви товару
function getIconForTitle(title) {
    const lower = title.toLowerCase();

    if (lower.includes("маркер") || lower.includes("виділен")) return "🖍️";
    if (lower.includes("ручк")) return "🖊️";
    if (lower.includes("пенал")) return "👝";
    if (lower.includes("зошит")) return "📓";
    if (lower.includes("олівц") || lower.includes("олівець")) return "✏️";
    if (lower.includes("альбом") || lower.includes("малюв")) return "🎨";
    if (lower.includes("ножиц")) return "✂️";
    if (lower.includes("скріп") || lower.includes("затискач")) return "📎";
    if (lower.includes("щоденник") || lower.includes("книг") || lower.includes("блокнот")) return "📙";
    if (lower.includes("папір") || lower.includes("аркуш")) return "📄";
    if (lower.includes("лінійк")) return "📏";
    if (lower.includes("клей")) return "🧪";

    return "📝";
}

// Відображення текстових повідомлень про помилки
function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

// Очищення повідомлень
function clearMessage() {
    message.textContent = "";
}

// Збереження даних у JSON-файл через IPC
async function persist() {
    await window.notesAPI.saveNotes(appState);
}

// Головна функція відображення каталогу та кошика
function render() {
    itemList.innerHTML = "";

    const filtered = appState.items.filter((item) => {
        if (appState.filter === "available") return !item.done;
        return true;
    });

    filtered.forEach((item) => {
        const isInCart = appState.cart.some((c) => c.id === item.id);

        const card = document.createElement("div");
        card.className = `item-card ${item.done ? "done" : ""}`;

        card.innerHTML = `
      <div class="item-info">
        <span class="item-icon">${item.icon || getIconForTitle(item.title)}</span>
        <div>
          <div class="item-title ${item.done ? "done-text" : ""}">${item.title}</div>
          <div class="item-price">${item.price} грн</div>
        </div>
      </div>
      <div class="item-actions">
        <button class="btn-cart ${isInCart ? "in-cart" : ""}" ${isInCart ? "disabled" : ""}>
          ${isInCart ? "✓ В кошику" : "🛒 В кошик"}
        </button>
        <button class="btn-delete">🗑️</button>
      </div>
    `;

        // Зміна стану товару (в наявності / немає) при натисканні на інформацію
        card.querySelector(".item-info").addEventListener("click", async () => {
            appState.items = appState.items.map((i) =>
                i.id === item.id ? { ...i, done: !i.done } : i
            );
            render();
            await persist();
        });

        // Додавання товару в кошик
        const cartBtn = card.querySelector(".btn-cart");
        if (!isInCart) {
            cartBtn.addEventListener("click", async (e) => {
                e.stopPropagation();
                appState.cart.push(item);
                render();
                await persist();
            });
        }

        // Видалення товару з каталогу
        card.querySelector(".btn-delete").addEventListener("click", async (e) => {
            e.stopPropagation();
            appState.items = appState.items.filter((i) => i.id !== item.id);
            appState.cart = appState.cart.filter((c) => c.id !== item.id);
            clearMessage();
            render();
            await persist();
        });

        itemList.appendChild(card);
    });

    renderCart();
}

// Відображення вмісту кошика з хрестиками видалення
function renderCart() {
    if (appState.cart.length === 0) {
        cartContent.innerHTML = `<div class="empty-cart">Кошик порожній</div>`;
        return;
    }

    let total = 0;
    let html = "";

    appState.cart.forEach((item) => {
        total += item.price;
        html += `
      <div class="cart-list-item">
        <div class="cart-item-info">
          <span>${item.icon || getIconForTitle(item.title)} ${item.title}</span>
        </div>
        <div class="cart-item-right">
          <strong>${item.price} грн</strong>
          <button class="remove-cart-item-btn" data-id="${item.id}" title="Видалити з кошика">&times;</button>
        </div>
      </div>
    `;
    });

    html += `
    <div class="cart-summary">
      <div>Разом: <strong>${total} грн</strong></div>
      <button id="checkoutBtn" class="btn-checkout">Оформити замовлення</button>
    </div>
  `;

    cartContent.innerHTML = html;

    // Видалення товару безпосередньо з кошика
    document.querySelectorAll(".remove-cart-item-btn").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            const idToRemove = e.target.getAttribute("data-id");
            appState.cart = appState.cart.filter((item) => item.id !== idToRemove);
            render();
            await persist();
        });
    });

    // Відкриття модального вікна оплати
    document.getElementById("checkoutBtn").addEventListener("click", () => {
        modalPaySum.textContent = `${total} грн`;
        payBtnAmount.textContent = `${total} грн`;
        paymentStatus.textContent = "";

        document.getElementById("cardNumber").value = "";
        document.getElementById("cardExpiry").value = "";
        document.getElementById("cardCvc").value = "";

        paymentModal.style.display = "flex";
    });
}

// Перевірка та підтвердження оплати карткою
paySubmitBtn.addEventListener("click", () => {
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const cardExpiry = document.getElementById("cardExpiry").value.trim();
    const cardCvc = document.getElementById("cardCvc").value.trim();

    // Валідація: перевірка на заповнення усіх реквізитів
    if (!cardNumber || !cardExpiry || !cardCvc) {
        paymentStatus.textContent = "Будь ласка, заповніть усі реквізити картки!";
        paymentStatus.style.color = "#ef4444";
        return;
    }

    // Обробка платежу при успішній валідації
    paymentStatus.textContent = "Обробка платежу...";
    paymentStatus.style.color = "#2563eb";

    setTimeout(() => {
        paymentStatus.textContent = "Успішно!";
        paymentStatus.style.color = "#059669";

        setTimeout(async () => {
            appState.cart = [];
            paymentModal.style.display = "none";

            document.getElementById("cardNumber").value = "";
            document.getElementById("cardExpiry").value = "";
            document.getElementById("cardCvc").value = "";

            render();
            await persist();
        }, 1000);
    }, 800);
});

// Закриття вікна оплати
function hidePayModal() {
    paymentModal.style.display = "none";
    paymentStatus.textContent = "";
}

cancelPayBtn.addEventListener("click", hidePayModal);
closePayModalCross.addEventListener("click", hidePayModal);

// Додавання нового товару користувачем з обмеженням (лише літери) та авто-іконкою
async function addItem() {
    const title = itemTitle.value.trim();
    const price = parseFloat(itemPrice.value);

    // Регулярний вираз: лише кириличні та латинські літери, пробіли, дефіс та апостроф
    const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]+$/;

    if (!title || isNaN(price) || price <= 0) {
        showMessage("Будь ласка, заповніть назву та ціну товару.", "#ef4444");
        return;
    }

    // Перевірка на відсутність цифр та спецсимволів у назві
    if (!nameRegex.test(title)) {
        showMessage("Назва товару повинна містити лише літери!", "#ef4444");
        return;
    }

    const newItem = {
        id: Date.now().toString(),
        title,
        price,
        icon: getIconForTitle(title),
        done: false
    };

    appState.items.unshift(newItem);
    itemTitle.value = "";
    itemPrice.value = "";
    clearMessage();

    render();
    await persist();
}

addItemBtn.addEventListener("click", addItem);
itemPrice.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addItem();
});

// Перемикачі фільтрів
filterAll.addEventListener("click", () => {
    appState.filter = "all";
    filterAll.classList.add("active");
    filterAvailable.classList.remove("active");
    render();
});

filterAvailable.addEventListener("click", () => {
    appState.filter = "available";
    filterAvailable.classList.add("active");
    filterAll.classList.remove("active");
    render();
});

// Скидання та відновлення початкового каталогу
resetCatalogBtn.addEventListener("click", async () => {
    appState.items = [...INITIAL_ITEMS];
    appState.cart = [];
    clearMessage();
    render();
    await persist();
});

// Плавна прокрутка для посилань у шапці
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Скролл сторінки вгору
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Завантаження даних із файлу при запуску застосунку
window.addEventListener("DOMContentLoaded", async () => {
    const loaded = await window.notesAPI.loadNotes();
    if (loaded && loaded.items && loaded.items.length > 0) {
        appState.items = loaded.items;
        appState.cart = loaded.cart || [];
    } else {
        appState.items = INITIAL_ITEMS;
    }
    render();
});