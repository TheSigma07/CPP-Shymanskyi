document.addEventListener('DOMContentLoaded', () => {
    const mainBtn = document.getElementById('mainBtn');
    const navCatalogBtn = document.getElementById('navCatalogBtn');
    const catalog = document.getElementById('catalog');
    const featureCards = document.querySelectorAll('.feature-card');
    const buyButtons = document.querySelectorAll('.buy-btn');
    const cartCountEl = document.getElementById('cartCount');
    const cartTotalEl = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    const paymentModal = document.getElementById('paymentModal');
    const closeModal = document.getElementById('closeModal');
    const modalTotal = document.getElementById('modalTotal');
    const paymentForm = document.getElementById('paymentForm');

    let cartCount = 0;
    let cartTotal = 0;

    const toggleCatalog = () => {
        catalog.classList.toggle('hidden');
        if (!catalog.classList.contains('hidden')) {
            mainBtn.textContent = 'Сховати каталог';
            catalog.scrollIntoView({ behavior: 'smooth' });
        } else {
            mainBtn.textContent = 'Переглянути каталог';
        }
    };

    mainBtn.addEventListener('click', toggleCatalog);

    if (navCatalogBtn) {
        navCatalogBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (catalog.classList.contains('hidden')) {
                catalog.classList.remove('hidden');
                mainBtn.textContent = 'Сховати каталог';
            }
            catalog.scrollIntoView({ behavior: 'smooth' });
        });
    }

    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            alert(card.getAttribute('data-info'));
        });
    });

    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const price = parseInt(button.getAttribute('data-price'));

            cartCount++;
            cartTotal += price;

            cartCountEl.textContent = cartCount;
            cartTotalEl.textContent = cartTotal;

            checkoutBtn.disabled = false;

            const originalText = button.textContent;
            button.textContent = 'Додано! ✓';
            button.style.backgroundColor = '#27ae60';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '#2b5876';
            }, 800);
        });
    });

    checkoutBtn.addEventListener('click', () => {
        modalTotal.textContent = cartTotal;
        paymentModal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', () => {
        paymentModal.classList.add('hidden');
    });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        alert(`Оплата успішна! Дякуємо за замовлення на суму ${cartTotal} грн.`);

        cartCount = 0;
        cartTotal = 0;
        cartCountEl.textContent = '0';
        cartTotalEl.textContent = '0';
        checkoutBtn.disabled = true;

        paymentModal.classList.add('hidden');
        paymentForm.reset();
    });
});