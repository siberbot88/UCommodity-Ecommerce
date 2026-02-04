/**
 * Ucomodity - Main Application JavaScript
 * Vanilla JavaScript untuk interaktivitas website
 */

// ========== GLOBAL STATE ==========
const AppState = {
    cart: [],
    user: null,
    wishlist: [],
};

// ========== CART FUNCTIONALITY ==========
class CartManager {
    constructor() {
        this.loadCartFromStorage();
        this.updateCartUI();
    }

    loadCartFromStorage() {
        const savedCart = localStorage.getItem('ucomodity_cart');
        if (savedCart) {
            AppState.cart = JSON.parse(savedCart);
        }
    }

    saveCartToStorage() {
        localStorage.setItem('ucomodity_cart', JSON.stringify(AppState.cart));
    }

    addToCart(product) {
        // Cek apakah produk sudah ada di cart
        const existingItem = AppState.cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
            this.showNotification('Jumlah produk di keranjang ditambahkan! 🎉', 'success');
        } else {
            AppState.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
            });
            this.showNotification(`${product.name} ditambahkan ke keranjang! 🛒`, 'success');
        }

        this.saveCartToStorage();
        this.updateCartUI();
    }

    removeFromCart(productId) {
        AppState.cart = AppState.cart.filter(item => item.id !== productId);
        this.saveCartToStorage();
        this.updateCartUI();
        this.showNotification('Produk dihapus dari keranjang', 'info');
    }

    updateQuantity(productId, newQuantity) {
        const item = AppState.cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCartToStorage();
                this.updateCartUI();
            }
        }
    }

    getCartTotal() {
        return AppState.cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    getCartCount() {
        return AppState.cart.reduce((count, item) => count + item.quantity, 0);
    }

    updateCartUI() {
        // Update cart badge count
        const cartBadges = document.querySelectorAll('.cart-count');
        const count = this.getCartCount();

        cartBadges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });

        // Update cart page if exists
        this.renderCartPage();
    }

    renderCartPage() {
        const cartContainer = document.getElementById('cart-items');
        if (!cartContainer) return;

        if (AppState.cart.length === 0) {
            cartContainer.innerHTML = `
        <div style="text-align: center; padding: var(--space-12);">
          <h3>Keranjang Belanja Kosong</h3>
          <p class="text-secondary">Yuk mulai belanja tanaman favoritmu!</p>
          <a href="/products" class="btn btn-primary mt-4">Mulai Belanja</a>
        </div>
      `;
            return;
        }

        cartContainer.innerHTML = AppState.cart.map(item => `
      <div class="cart-item" data-product-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="price">Rp ${this.formatPrice(item.price)}</p>
        </div>
        <div class="quantity-controls">
          <button onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <span>${item.quantity}</span>
          <button onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
        <div class="cart-item-total">
          <p>Rp ${this.formatPrice(item.price * item.quantity)}</p>
        </div>
        <button onclick="cart.removeFromCart(${item.id})" class="btn-remove">🗑️</button>
      </div>
    `).join('');

        // Update total
        document.getElementById('cart-total').textContent = `Rp ${this.formatPrice(this.getCartTotal())}`;
    }

    formatPrice(price) {
        return new Intl.NumberFormat('id-ID').format(price);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-info)'};
      color: white;
      padding: var(--space-4) var(--space-6);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      z-index: var(--z-tooltip);
      animation: slideInRight 0.3s ease-out;
    `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize Cart Manager
const cart = new CartManager();

// ========== PRODUCT FILTER ==========
class ProductFilter {
    constructor() {
        this.filters = {
            category: null,
            priceRange: [0, 10000000],
            careLevel: null,
            search: '',
        };
    }

    setCategory(category) {
        this.filters.category = category;
        this.applyFilters();
    }

    setPriceRange(min, max) {
        this.filters.priceRange = [min, max];
        this.applyFilters();
    }

    setCareLevel(level) {
        this.filters.careLevel = level;
        this.applyFilters();
    }

    setSearch(query) {
        this.filters.search = query.toLowerCase();
        this.applyFilters();
    }

    applyFilters() {
        const products = document.querySelectorAll('.product-card');

        products.forEach(product => {
            const matchesCategory = !this.filters.category || product.dataset.category === this.filters.category;
            const price = parseInt(product.dataset.price);
            const matchesPrice = price >= this.filters.priceRange[0] && price <= this.filters.priceRange[1];
            const matchesCare = !this.filters.careLevel || product.dataset.careLevel === this.filters.careLevel;
            const matchesSearch = !this.filters.search || product.dataset.name.toLowerCase().includes(this.filters.search);

            if (matchesCategory && matchesPrice && matchesCare && matchesSearch) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
}

// Initialize Product Filter
const productFilter = new ProductFilter();

// ========== SEARCH FUNCTIONALITY ==========
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    let debounceTimer;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            productFilter.setSearch(e.target.value);
        }, 300);
    });
}

// ========== FORM VALIDATION ==========
class FormValidator {
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePhone(phone) {
        const re = /^(\+62|62|0)[0-9]{9,12}$/;
        return re.test(phone.replace(/\s/g, ''));
    }

    static validatePassword(password) {
        return password.length >= 8;
    }

    static showError(input, message) {
        const errorDiv = input.parentElement.querySelector('.error-message') || document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = 'color: var(--color-error); font-size: var(--text-sm); margin-top: var(--space-1);';

        if (!input.parentElement.querySelector('.error-message')) {
            input.parentElement.appendChild(errorDiv);
        }

        input.style.borderColor = 'var(--color-error)';
    }

    static clearError(input) {
        const errorDiv = input.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.style.borderColor = '';
    }
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========== IMAGE LAZY LOADING ==========
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========== INITIALIZE ON DOM READY ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
    initSmoothScroll();
    initLazyLoading();

    console.log('🌱 Ucomodity App Initialized');
    console.log('Powered by SawitDB - Database Buatan Indonesia');
});

// ========== EXPORT FOR GLOBAL ACCESS ==========
window.cart = cart;
window.productFilter = productFilter;
window.FormValidator = FormValidator;
