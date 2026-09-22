document.addEventListener("DOMContentLoaded", () => {
    let cart = []; // Масив обраних товарів

    const cartCountEl = document.getElementById("cartCount");
    const cartTotalEl = document.getElementById("cartTotal");
    const cartItemsEl = document.getElementById("cartItems");
    const checkoutBtn = document.getElementById("checkoutBtn");
    const mainBtn = document.getElementById("mainBtn");
    const catalogSection = document.getElementById("catalog");

    // Обробка натискання кнопок "У кошик"
    const buyBtns = document.querySelectorAll(".buy-btn");
    buyBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".product-card");
            const title = card.querySelector("h3").textContent;
            const price = parseInt(btn.getAttribute("data-price"));

            addToCart(title, price);
        });
    });

    // Додавання товару в масив
    function addToCart(title, price) {
        const existingItem = cart.find(item => item.title === title);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ title, price, quantity: 1 });
        }
        updateCartUI();
    }

    // Видалення товару (або зменшення кількості)
    window.removeFromCart = function(title) {
        const itemIndex = cart.findIndex(item => item.title === title);
        if (itemIndex !== -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity -= 1;
            } else {
                cart.splice(itemIndex, 1);
            }
        }
        updateCartUI();
    };

    // Оновлення відображення кошика
    function updateCartUI() {
        let totalCount = 0;
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsEl.innerHTML = `<p class="empty-cart-msg">Кошик порожній</p>`;
            checkoutBtn.disabled = true;
        } else {
            cartItemsEl.innerHTML = cart.map(item => {
                totalCount += item.quantity;
                totalPrice += item.price * item.quantity;
                return `
                    <div class="cart-item">
                        <span class="cart-item-title">${item.title} (x${item.quantity})</span>
                        <span class="cart-item-price">${item.price * item.quantity} грн</span>
                        <button class="remove-btn" onclick="removeFromCart('${item.title}')" title="Видалити">🗑️</button>
                    </div>
                `;
            }).join("");
            checkoutBtn.disabled = false;
        }

        cartCountEl.textContent = totalCount;
        cartTotalEl.textContent = totalPrice;
    }

    // Плавний скролл до каталогу
    if (mainBtn && catalogSection) {
        mainBtn.addEventListener("click", () => {
            catalogSection.scrollIntoView({ behavior: "smooth" });
        });
    }

    // Модальне вікно оплати
    const modal = document.getElementById("paymentModal");
    const closeModal = document.getElementById("closeModal");
    const modalTotal = document.getElementById("modalTotal");
    const paymentForm = document.getElementById("paymentForm");

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            const currentTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            if (modalTotal) modalTotal.textContent = currentTotal;
            if (modal) modal.classList.remove("hidden");
        });
    }

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            if (modal) modal.classList.add("hidden");
        });
    }

    if (paymentForm) {
        paymentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Дякуємо! Оплата успішно проведена.");
            cart = [];
            updateCartUI();
            if (modal) modal.classList.add("hidden");
            paymentForm.reset();
        });
    }
});