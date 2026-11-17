const titleInput = document.getElementById("titleInput");
const priceInput = document.getElementById("priceInput");
const addBtn = document.getElementById("addBtn");
const errorMsg = document.getElementById("errorMsg");
const searchInput = document.getElementById("searchInput");
const itemsList = document.getElementById("itemsList");

function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
}

async function render() {
    const items = await window.catalogAPI.list(searchInput.value);
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
                <span class="item-date">Додано: ${formatDate(item.createdAt)}</span>
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
    const res = await window.catalogAPI.add(titleInput.value, priceInput.value);
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

addBtn.addEventListener("click", async () => {
    errorMsg.textContent = "";
    errorMsg.style.color = "";
    const res = await window.catalogAPI.add({
        title: titleInput.value,
        price: priceInput.value
    });
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

render();