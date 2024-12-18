// Cart functionality
const cartFunctions = {
  // Function to test localStorage
  testLocalStorage: function() {
    try {
      localStorage.setItem('test', 'test');
      const testValue = localStorage.getItem('test');
      localStorage.removeItem('test');
      console.log('localStorage test:', testValue === 'test' ? 'PASSED' : 'FAILED');
      return testValue === 'test';
    } catch (error) {
      console.error('localStorage test FAILED:', error);
      return false;
    }
  },

  // Function to get cart from localStorage
  getCart: function() {
    try {
      const cartData = localStorage.getItem('cart');
      console.log('Raw cart data:', cartData);
      const cart = cartData ? JSON.parse(cartData) : [];
      console.log('Parsed cart:', cart);
      return cart;
    } catch (error) {
      console.error('Error getting cart:', error);
      return [];
    }
  },

  // Function to save cart to localStorage
  saveCart: function(cart) {
    try {
      const cartString = JSON.stringify(cart);
      console.log('Saving cart:', cartString);
      localStorage.setItem('cart', cartString);
      console.log('Cart saved successfully');
      return true;
    } catch (error) {
      console.error('Error saving cart:', error);
      return false;
    }
  },

  // Function to update cart count
  updateCartCount: function() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      const cart = this.getCart();
      const totalItems = cart.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
      console.log('Updating cart count to:', totalItems);
      cartCount.textContent = totalItems || 0;
    }
  },

  // Function to add to cart
  addToCart: function(product, size, color) {
    try {
      console.log('Adding product to cart:', { product, size, color });
      
      if (!product || !product.id || !product.name || !product.price || !product.image) {
        console.error('Invalid product data:', product);
        return false;
      }

      if (!size || !color) {
        console.error('Size or color not specified');
        return false;
      }

      // Update button state
      const addToCartBtn = document.getElementById('add-to-cart');
      if (addToCartBtn) {
        addToCartBtn.textContent = 'Adding...';
        addToCartBtn.classList.add('adding');
      }

      let cart = this.getCart();
      console.log('Current cart before add:', cart);

      const existingItemIndex = cart.findIndex(item => 
        item.id === product.id && 
        item.size === size && 
        item.color === color
      );

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
        console.log('Updated existing item quantity');
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: size,
          color: color,
          quantity: 1
        });
        console.log('Added new item to cart');
      }

      const saved = this.saveCart(cart);
      if (saved) {
        this.updateCartCount();
        console.log('Cart updated successfully');
        
        // Show success state
        if (addToCartBtn) {
          setTimeout(() => {
            addToCartBtn.classList.remove('adding');
            addToCartBtn.classList.add('added');
            addToCartBtn.textContent = 'Added to Cart!';
            
            // Reset button after 2 seconds
            setTimeout(() => {
              addToCartBtn.classList.remove('added');
              addToCartBtn.textContent = 'Add to Cart';
            }, 2000);
          }, 500);
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Reset button on error
      const addToCartBtn = document.getElementById('add-to-cart');
      if (addToCartBtn) {
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.classList.remove('adding', 'added');
      }
      return false;
    }
  },

  // Function to format price
  formatPrice: function(price) {
    return `$${parseFloat(price).toFixed(2)}`;
  },

  // Function to remove item from cart
  removeFromCart: function(index) {
    try {
      console.log('Removing item at index:', index);
      let cart = this.getCart();
      cart.splice(index, 1);
      if (this.saveCart(cart)) {
        this.displayCart();
        this.updateCartCount();
        console.log('Item removed successfully');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  },

  // Function to update item quantity
  updateQuantity: function(index, change) {
    try {
      console.log('Updating quantity for index:', index, 'change:', change);
      let cart = this.getCart();
      if (cart[index]) {
        const newQuantity = (parseInt(cart[index].quantity) || 0) + change;
        if (newQuantity > 0) {
          cart[index].quantity = newQuantity;
          if (this.saveCart(cart)) {
            this.displayCart();
            this.updateCartCount();
            console.log('Quantity updated successfully');
          }
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  },

  // Function to display cart
  displayCart: function() {
    const cartItems = document.querySelector('.cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const cartContent = document.querySelector('.cart-content');
    const cart = this.getCart();
    let total = 0;

    if (cart.length === 0) {
      cartContent.style.display = 'none';
      emptyCartMessage.style.display = 'block';
      return;
    }

    cartContent.style.display = 'grid';
    emptyCartMessage.style.display = 'none';
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <div class="item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="item-details">
          <h3>${item.name}</h3>
          <p class="item-size">Size: ${item.size}</p>
          <p class="item-color">Color: ${item.color}</p>
          <p class="item-price">$${item.price.toFixed(2)}</p>
        </div>
        <div class="item-quantity">
          <button class="quantity-btn minus" onclick="cartFunctions.updateQuantity(${index}, -1)">−</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn plus" onclick="cartFunctions.updateQuantity(${index}, 1)">+</button>
        </div>
        <div class="item-total">
          <p>$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <button class="remove-btn" onclick="cartFunctions.removeFromCart(${index})">
          <span class="remove-icon">×</span>
        </button>
      `;
      cartItems.appendChild(itemElement);
    });

    document.getElementById('cart-subtotal').textContent = `$${total.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
  },

  // Function to handle checkout
  handleCheckout: function() {
    const cart = this.getCart();
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Proceeding to checkout...');
    // Add checkout logic here
  },

  // Initialize cart
  init: function() {
    console.log('Initializing cart...');
    console.log('Testing localStorage...');
    if (!this.testLocalStorage()) {
      console.error('localStorage is not available!');
      alert('Your browser does not support or has disabled local storage. The cart functionality will not work properly.');
      return;
    }
    
    // Initialize cart count on page load
    this.updateCartCount();
    
    // Initialize cart display if on cart page
    if (window.location.pathname.includes('cart.html')) {
      this.displayCart();
      
      // Add checkout button listener
      const checkoutBtn = document.getElementById('checkout-btn');
      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => this.handleCheckout());
      }
    }
    console.log('Cart initialization complete');
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing cart...');
  cartFunctions.init();
});

// Initialize immediately in case DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('DOM already loaded, initializing cart...');
  cartFunctions.init();
}
