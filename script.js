// Sample product data
/* Updated product data with improved structure */
const products = [
    {
        id: 1,
        name: "Amul Milk",
        price: 60,
        image: "https://m.media-amazon.com/images/I/71Qx5Q6QZQL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 2,
        name: "Amul Butter",
        price: 50,
        image: "https://m.media-amazon.com/images/I/71Qx5Q6QZQL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 3,
        name: "Amul Cheese",
        price: 100,
        image: "https://m.media-amazon.com/images/I/71Qx5Q6QZQL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 4,
        name: "Amul Ghee",
        price: 500,
        image: "https://m.media-amazon.com/images/I/71Qx5Q6QZQL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 5,
        name: "Amul Curd",
        price: 40,
        image: "https://m.media-amazon.com/images/I/71Qx5Q6QZQL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 6,
        name: "Amul Paneer",
        price: 80,
        image: "https://m.media-amazon.com/images/I/71Qx5Q6QZQL._AC_UF1000,1000_QL80_.jpg"
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
            <p class="product-price">₹${product.price.toFixed(2)}</p>
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
            <span>₹${(item.price * item.quantity).toFixed(2)}</span>
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