document.addEventListener("DOMContentLoaded", () => {
    const cartItem = JSON.parse(localStorage.getItem("cartItem"));
    const paymentContainer = document.querySelector(".payment");

    if (cartItem) {
        // Display cart details
        const cartDetails = `
            <div class="cartSummary">
                <h2>Order Summary</h2>
                <img src="${cartItem.img}" alt="${cartItem.productName}" style="width: 150px; margin-bottom: 10px;">
                <p><strong>Product:</strong> ${cartItem.productName}</p>
                <p><strong>Size:</strong> ${cartItem.size}</p>
                <p><strong>Quantity:</strong> ${cartItem.quantity}</p>
                <p><strong>Total Price:</strong> $${cartItem.price * cartItem.quantity}</p>
                <button id="deleteCartItem" style="color: red;">Remove Item</button>
            </div>
        `;

        // Add cart details to the page
        paymentContainer.insertAdjacentHTML("afterbegin", cartDetails);

        // Add "Delete" functionality
        document.getElementById("deleteCartItem").addEventListener("click", () => {
            localStorage.removeItem("cartItem");
            alert("Item removed from cart!");
            window.location.href = "details.html"; // Redirect back to details page
        });
    } else {
        // If no cart data, show a message
        paymentContainer.innerHTML = "<h2>Your cart is empty.</h2>";
    }
});