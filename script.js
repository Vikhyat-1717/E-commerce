// Sample product data
/* Updated product data with improved structure */
const products = [
    {
        id: 1,
        name: "Smartphone",
        price: 599.99,
        image: "https://via.placeholder.com/300x200?text=Smartphone"
    },
    {
        id: 2,
        name: "Laptop",
        price: 999.99,
        image: "https://via.placeholder.com/300x200?text=Laptop"
    },
    {
        id: 3,
        name: "Headphones",
        price: 199.99,
        image: "https://via.placeholder.com/300x200?text=Headphones"
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 249.99,
        image: "https://via.placeholder.com/300x200?text=Smart+Watch"
    },
    {
        id: 5,
        name: "Tablet",
        price: 449.99,
        image: "https://via.placeholder.com/300x200?text=Tablet"
    },
    {
        id: 6,
        name: "Camera",
        price: 799.99,
        image: "https://via.placeholder.com/300x200?text=Camera"
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
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
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
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
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