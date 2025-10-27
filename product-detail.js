// Enhanced product data with detailed information
const detailedProducts = {
    1: {
        id: 1,
        name: "Classic Pickle Costume",
        description: "The timeless pickle look with realistic texture and comfortable fit. Perfect for Halloween parties! This classic costume features authentic pickle details and premium materials that ensure both comfort and durability.",
        price: 29.99,
        emoji: "🥒",
        category: "adult",
        features: [
            "100% polyester material for comfort",
            "Realistic pickle texture and color",
            "One-size-fits-most design (S-XL)",
            "Machine washable",
            "Perfect for Halloween, cosplay, or themed parties",
            "Comes with matching hat"
        ],
        images: ["🥒", "🥒", "🥒", "🥒"],
        relatedProducts: [2, 4, 5]
    },
    2: {
        id: 2,
        name: "Giant Pickle Suit",
        description: "Make a statement with this oversized pickle costume. Guaranteed to be the talk of any event! This eye-catching costume features an inflatable design that makes you the center of attention.",
        price: 49.99,
        emoji: "🥒",
        category: "adult",
        features: [
            "Inflatable design for maximum impact",
            "Battery-powered fan included",
            "Easy to inflate and deflate",
            "Durable vinyl material",
            "Perfect for parades and events",
            "Includes carrying bag"
        ],
        images: ["🥒", "🥒", "🥒", "🥒"],
        relatedProducts: [1, 5, 6]
    },
    3: {
        id: 3,
        name: "Kids Pickle Pajamas",
        description: "Comfy and cute pickle-themed pajamas for your little ones. Perfect for bedtime or casual wear! Made with soft, breathable fabric that kids love.",
        price: 19.99,
        emoji: "🥒",
        category: "kids",
        features: [
            "100% cotton for comfort",
            "Soft, breathable fabric",
            "Available in sizes 2T-12",
            "Machine washable",
            "Fun pickle print design",
            "Elastic waistband"
        ],
        images: ["🥒", "🥒", "🥒", "🥒"],
        relatedProducts: [6, 4, 1]
    },
    4: {
        id: 4,
        name: "Pickle Hat & Gloves Set",
        description: "Complete the look with our matching pickle hat and gloves. Great for cold weather events! Perfect accessories to complement any pickle costume.",
        price: 15.99,
        emoji: "🥒",
        category: "accessories",
        features: [
            "Warm fleece material",
            "Matching hat and gloves set",
            "One-size-fits-all design",
            "Perfect for winter events",
            "Complements any pickle costume",
            "Machine washable"
        ],
        images: ["🥒", "🥒", "🥒", "🥒"],
        relatedProducts: [1, 3, 5]
    },
    5: {
        id: 5,
        name: "Deluxe Pickle Costume Pro",
        description: "Our premium pickle costume with LED lights and sound effects. The ultimate pickle experience! This high-end costume includes built-in electronics for an unforgettable look.",
        price: 79.99,
        emoji: "🥒",
        category: "premium",
        features: [
            "LED lights with multiple color modes",
            "Built-in sound effects",
            "Premium materials and construction",
            "Rechargeable battery pack",
            "Remote control for effects",
            "Professional quality finish"
        ],
        images: ["🥒", "🥒", "🥒", "🥒"],
        relatedProducts: [1, 2, 4]
    },
    6: {
        id: 6,
        name: "Pickle Family Pack",
        description: "Get the whole family dressed as pickles! Includes 2 adult and 2 kids costumes at a special price. Perfect for family photos and group events.",
        price: 99.99,
        emoji: "🥒",
        category: "family",
        features: [
            "2 adult costumes (S-XL)",
            "2 kids costumes (2T-12)",
            "Matching family design",
            "Special bundle pricing",
            "Perfect for group photos",
            "Great for family events"
        ],
        images: ["🥒", "🥒", "🥒", "🥒"],
        relatedProducts: [1, 3, 5]
    }
};

// Get product ID from URL parameters
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')) || 1;
}

// Load product details
function loadProductDetails() {
    const productId = getProductIdFromUrl();
    const product = detailedProducts[productId];
    
    if (!product) {
        console.error('Product not found');
        return;
    }
    
    // Update page title
    document.title = `${product.name} - Pickle Paradise`;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-product').textContent = product.name;
    
    // Update product information
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productPrice').textContent = `$${product.price}`;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productEmoji').textContent = product.emoji;
    
    // Update features
    const featuresList = document.getElementById('productFeatures');
    featuresList.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Update image gallery
    const imageGallery = document.getElementById('imageGallery');
    imageGallery.innerHTML = '';
    product.images.forEach((image, index) => {
        const galleryImage = document.createElement('div');
        galleryImage.className = 'gallery-image';
        if (index === 0) galleryImage.classList.add('active');
        galleryImage.textContent = image;
        galleryImage.onclick = () => selectGalleryImage(galleryImage, image);
        imageGallery.appendChild(galleryImage);
    });
    
    // Load related products
    loadRelatedProducts(product.relatedProducts);
}

// Select gallery image
function selectGalleryImage(element, emoji) {
    // Remove active class from all gallery images
    document.querySelectorAll('.gallery-image').forEach(img => img.classList.remove('active'));
    
    // Add active class to clicked image
    element.classList.add('active');
    
    // Update main image
    document.getElementById('productEmoji').textContent = emoji;
}

// Load related products
function loadRelatedProducts(relatedIds) {
    const relatedGrid = document.getElementById('relatedProducts');
    relatedGrid.innerHTML = '';
    
    relatedIds.forEach(id => {
        const product = detailedProducts[id];
        if (product) {
            const card = document.createElement('div');
            card.className = 'related-product-card';
            card.onclick = () => goToProduct(id);
            card.innerHTML = `
                <div class="related-product-emoji">${product.emoji}</div>
                <div class="related-product-name">${product.name}</div>
                <div class="related-product-price">$${product.price}</div>
            `;
            relatedGrid.appendChild(card);
        }
    });
}

// Go to product detail page
function goToProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Change quantity
function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let currentQuantity = parseInt(quantityInput.value);
    let newQuantity = currentQuantity + change;
    
    if (newQuantity >= 1 && newQuantity <= 10) {
        quantityInput.value = newQuantity;
    }
}

// Add to cart from detail page
function addToCartFromDetail() {
    const productId = getProductIdFromUrl();
    const product = detailedProducts[productId];
    const quantity = parseInt(document.getElementById('quantity').value);
    const size = document.getElementById('sizeSelect').value;
    
    if (product) {
        // Add each item individually to respect quantity
        for (let i = 0; i < quantity; i++) {
            const existingItem = cart.find(item => item.id === productId && item.size === size);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...product,
                    quantity: 1,
                    size: size
                });
            }
        }
        
        updateCartDisplay();
        showCartNotification();
        
        // Show success message
        showNotification(`${quantity} x ${product.name} added to cart!`);
    }
}

// Buy now function
function buyNow() {
    const productId = getProductIdFromUrl();
    const product = detailedProducts[productId];
    const quantity = parseInt(document.getElementById('quantity').value);
    const size = document.getElementById('sizeSelect').value;
    
    if (product) {
        // Clear cart and add this item
        cart = [];
        cart.push({
            ...product,
            quantity: quantity,
            size: size
        });
        
        updateCartDisplay();
        
        // Show cart modal
        cartModal.style.display = 'block';
        renderCartItems();
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4a7c59 0%, #6b9b6b 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize product detail page
document.addEventListener('DOMContentLoaded', function() {
    loadProductDetails();
    setupEventListeners();
});
