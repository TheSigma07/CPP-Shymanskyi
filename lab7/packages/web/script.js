import { CatalogService, formatItemDate } from "@papercraft/core";
import { LocalStorageAdapter } from "./localStorageAdapter.js";

const service = new CatalogService(new LocalStorageAdapter());

const titleInput = document.getElementById("titleInput");
const priceInput = document.getElementById("priceInput");
const addBtn = document.getElementById("addBtn");
const errorMsg = document.getElementById("errorMsg");
const searchInput = document.getElementById("searchInput");
const itemsList = document.getElementById("itemsList");

async function render() {
    const items = await service.list(searchInput.value);
    itemsList.innerHTML = "";

    if (!items || items.length === 0) {
        itemsList.innerHTML = `<p class="empty-msg">Товарів не знайдено</p>`;
        return;
    }

    for (const item of items) {
        const row = document.createElement("div");
        row.className = "item-row";
        row.innerHTML = `
            <div class="item-content">
                <strong>📦 ${item.title} — ${item.price} грн</strong>
                <span class="item-date">Додано: ${formatItemDate(item.createdAt)}</span>
            </div>
            <div>
                <button class="btn btn-cart ${item.inCart ? "active" : ""}" data-toggle="${item.id}">
                    ${item.inCart ? "У кошику ✓" : "В кошик"}
                </button>
                <button class="btn btn-danger" data-del="${item.id}">🗑</button>
            </div>
        `;
        itemsList.appendChild(row);
    }
}

addBtn.addEventListener("click", async () => {
    errorMsg.textContent = "";
    errorMsg.style.color = "";
    const res = await service.add(titleInput.value, priceInput.value);
    if (!res.ok) {
        errorMsg.textContent = res.error;
        return;
    }
    titleInput.value = "";
    priceInput.value = "";
    errorMsg.style.color = "#16a34a";
    errorMsg.textContent = "Товар успішно додано.";
    await render();
});

searchInput.addEventListener("input", render);

itemsList.addEventListener("click", async (e) => {
    const toggleBtn = e.target.closest("[data-toggle]");
    const delBtn = e.target.closest("[data-del]");

    if (toggleBtn) {
        await service.toggleCart(Number(toggleBtn.dataset.toggle));
        await render();
    }
    if (delBtn) {
        await service.remove(Number(delBtn.dataset.del));
        errorMsg.textContent = "Товар видалено.";
        errorMsg.style.color = "#16a34a";
        await render();
    }
});

render();