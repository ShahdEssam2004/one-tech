// JavaScript code for adding products to the cart

// Define an empty cart array to store added products
let cart = [];

// Function to add a product to the cart
function addToCart(productName, productPrice) {
  // Create a product object
  const product = {
    name: productName,
    price: parseFloat(productPrice.replace('$', '')), // Convert price to a number
  };

  // Add the product to the cart
  cart.push(product);

  // Update the cart display
  displayCart();

  // Notify the user
  alert(`${productName} has been added to the cart.`);
}

// Function to display the cart
function displayCart() {
  const cartContainer = document.querySelector(".card-contact .container .products");

  // Clear existing cart items
  cartContainer.innerHTML = "";

  // Populate cart items
  cart.forEach((product, index) => {
    const productElement = document.createElement("div");
    productElement.classList.add("cart-item");
    productElement.innerHTML = `
      <p>${product.name}</p>
      <span>$${product.price.toFixed(2)}</span>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartContainer.appendChild(productElement);
  });

  // Update total price
  const totalPriceElement = document.querySelector(".card-contact .total-price span");
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

  // Add event listeners for remove buttons
  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => {
      const productIndex = button.getAttribute("data-index");
      cart.splice(productIndex, 1); // Remove product from cart
      displayCart(); // Refresh cart display
    });
  });
}

// Attach event listeners to all "Add Cart" buttons
document.querySelectorAll(".addCart-btn button").forEach((button, index) => {
  button.addEventListener("click", () => {
    // Get product details from the DOM
    const productElement = button.closest(".product");
    const productName = productElement.querySelector("h4").innerText;
    const productPrice = productElement.querySelector("span").innerText;

    // Add the product to the cart
    addToCart(productName, productPrice);
  });
});
