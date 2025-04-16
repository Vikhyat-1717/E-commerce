// Sample product data
const products = [
    {
        id: 1,
        name: "Amul Gold Milk",
        price: 60,
        description: "Pure and fresh milk, rich in calcium and protein",
        image: "https://www.amul.com/images/product-images/amul-gold-milk.png"
    },
    {
        id: 2,
        name: "Amul Butter",
        price: 50,
        description: "Pure and creamy butter, perfect for cooking and baking",
        image: "https://www.amul.com/images/product-images/amul-butter.png"
    },
    {
        id: 3,
        name: "Amul Cheese",
        price: 100,
        description: "Rich and creamy cheese, great for sandwiches and snacks",
        image: "https://www.amul.com/images/product-images/amul-cheese.png"
    },
    {
        id: 4,
        name: "Amul Ghee",
        price: 500,
        description: "Pure desi ghee, perfect for traditional cooking",
        image: "https://www.amul.com/images/product-images/amul-ghee.png"
    },
    {
        id: 5,
        name: "Amul Masti Dahi",
        price: 40,
        description: "Fresh and creamy curd, great for digestion",
        image: "https://www.amul.com/images/product-images/amul-dahi.png"
    },
    {
        id: 6,
        name: "Amul Paneer",
        price: 80,
        description: "Fresh and soft paneer, perfect for Indian dishes",
        image: "https://www.amul.com/images/product-images/amul-paneer.png"
    }
];

// Cart state
let cart = [];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const closeCart = document.getElementById('closeCart');

// Display products
function displayProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300x200?text=${product.name}'">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">₹${product.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            <button class="view-details" onclick="viewProductDetails(${product.id})">View Details</button>
        </div>
    `).join('');
}

// View product details
function viewProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        window.location.href = `product.html?id=${productId}`;
    }
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateCart();
    // Show success message
    showNotification(`${product.name} added to cart!`);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Update cart display
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name} x${item.quantity}</span>
            <span>₹${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Event listeners
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Initialize the page
displayProducts(); 