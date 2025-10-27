// Product data
const products = [
    {
        id: 1,
        name: "Classic Pickle Costume",
        description: "The timeless pickle look with realistic texture and comfortable fit. Perfect for Halloween parties!",
        price: 29.99,
        emoji: "🥒",
        category: "adult"
    },
    {
        id: 2,
        name: "Giant Pickle Suit",
        description: "Make a statement with this oversized pickle costume. Guaranteed to be the talk of any event!",
        price: 49.99,
        emoji: "🥒",
        category: "adult"
    },
    {
        id: 3,
        name: "Kids Pickle Pajamas",
        description: "Comfy and cute pickle-themed pajamas for your little ones. Perfect for bedtime or casual wear!",
        price: 19.99,
        emoji: "🥒",
        category: "kids"
    },
    {
        id: 4,
        name: "Pickle Hat & Gloves Set",
        description: "Complete the look with our matching pickle hat and gloves. Great for cold weather events!",
        price: 15.99,
        emoji: "🥒",
        category: "accessories"
    },
    {
        id: 5,
        name: "Deluxe Pickle Costume Pro",
        description: "Our premium pickle costume with LED lights and sound effects. The ultimate pickle experience!",
        price: 79.99,
        emoji: "🥒",
        category: "premium"
    },
    {
        id: 6,
        name: "Pickle Family Pack",
        description: "Get the whole family dressed as pickles! Includes 2 adult and 2 kids costumes at a special price.",
        price: 99.99,
        emoji: "🥒",
        category: "family"
    }
];

// Shopping cart
let cart = [];

// DOM elements
const productGrid = document.getElementById('productGrid');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const closeModal = document.querySelector('.close');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupEventListeners();
    updateCartDisplay();
});

// Render products
function renderProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                ${product.emoji}
            </div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        updateCartDisplay();
        showCartNotification();
    }
}

// Update cart display
function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cartModal.style.display === 'block') {
        renderCartItems();
    }
}

// Render cart items
function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty. Add some pickles!</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <br>
                <span>$${item.price} x ${item.quantity}</span>
            </div>
            <div>
                <button onclick="removeFromCart(${item.id})" style="background: #ff6b6b; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 5px; cursor: pointer;">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// Show cart notification
function showCartNotification() {
    // Simple notification - you could enhance this with a toast notification
    cartCount.style.animation = 'none';
    setTimeout(() => {
        cartCount.style.animation = 'pulse 0.5s ease-in-out';
    }, 10);
}

// Setup event listeners
function setupEventListeners() {
    // Cart icon click
    document.querySelector('.cart-icon').addEventListener('click', function() {
        cartModal.style.display = 'block';
        renderCartItems();
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        alert(`Thank you for your order! Total: $${total.toFixed(2)}\n\nYour pickle costumes will be shipped within 2-3 business days.`);
        
        // Clear cart
        cart = [];
        updateCartDisplay();
        cartModal.style.display = 'none';
    });
}

// Smooth scroll to products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Add some fun animations
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add CSS animation for cart count
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
