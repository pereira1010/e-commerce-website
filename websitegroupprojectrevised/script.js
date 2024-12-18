// Product data
const products = [
    {
        id: 1,
        name: "Black Hoodie",
        price: 40.00,
        image: "./img/hoodie.jpg"
    },
    {
        id: 2,
        name: "Black Shorts",
        price: 25.00,
        image: "./img/shorts.jpg"
    },
    {
        id: 3,
        name: "Black Shirt",
        price: 30.00,
        image: "./img/shirt.jpg"
    },
    {
        id: 4,
        name: "Black Sweats",
        price: 30.00,
        image: "./img/sweats.jpg"
    }
];

// Function to render product list
function renderProductList() {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <a href="product.html?id=${product.id}" class="view-details">View Details</a>
        </div>
    `).join('');
}

// Render product details
function renderProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = products.find(p => p.id === parseInt(productId));

    if (product) {
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-image').alt = product.name;

        const addToCartBtn = document.getElementById('add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                const button = this;
                const size = document.getElementById('size').value;
                const color = document.getElementById('color').value;
                const productId = new URLSearchParams(window.location.search).get('id');
                const product = products.find(p => p.id === parseInt(productId));

                if (product) {
                    // Visual feedback - Start
                    button.classList.add('adding');
                    button.textContent = 'Adding...';

                    // Add item to cart
                    const cartItem = {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        size: size,
                        color: color,
                        quantity: 1
                    };

                    // Get existing cart
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    
                    // Check if item already exists
                    const existingItemIndex = cart.findIndex(item => 
                        item.id === cartItem.id && 
                        item.size === cartItem.size && 
                        item.color === cartItem.color
                    );

                    if (existingItemIndex !== -1) {
                        cart[existingItemIndex].quantity += 1;
                    } else {
                        cart.push(cartItem);
                    }

                    // Save cart
                    localStorage.setItem('cart', JSON.stringify(cart));
                    
                    // Update cart count
                    updateCartCount();

                    // Visual feedback - Success
                    setTimeout(() => {
                        button.classList.remove('adding');
                        button.classList.add('added');
                        button.textContent = 'Added to Cart!';
                        
                        // Reset button after 2 seconds
                        setTimeout(() => {
                            button.classList.remove('added');
                            button.textContent = 'Add to Cart';
                        }, 2000);
                    }, 500);
                }
            });
        }
    } else {
        console.error('Product not found');
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('product.html')) {
        renderProductDetails();
    } else {
        renderProductList();
    }
});

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}
