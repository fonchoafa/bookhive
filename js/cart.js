// =============================================
// BOOKHIVE - Cart Logic (cart.js)
// Cart state, addToCart, notifications
// =============================================

// ====================
// CART STATE
// ====================
let cart = [];

const savedCart = localStorage.getItem("bookhive-cart");
if (savedCart) {
  cart = JSON.parse(savedCart);
}

// ====================
// ADD TO CART
// ====================
function addToCart(bookId) {
  const book = books.find(b => b.id === bookId);
  if (!book) {
    alert("Book not found!");
    return;
  }
  if (!book.inStock) {
    alert("Sorry, this book is out of stock!");
    return;
  }

  const existingItem = cart.find(item => item.id === bookId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();
  showNotification(`Added "${book.title}" to cart! 🛒`);
}

// ====================
// SAVE CART
// ====================
function saveCart() {
  localStorage.setItem("bookhive-cart", JSON.stringify(cart));
}

// ====================
// UPDATE CART COUNT
// ====================
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalQuantity;
  }
}

// ====================
// SHOW NOTIFICATION
// ====================
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// ====================
// CART PAGE RENDERING
// ====================
function renderCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalElement = document.getElementById("cart-total");
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align:center; padding:60px 0;">
        <p style="font-size:3rem;">🛒</p>
        <h3>Your cart is empty</h3>
        <a href="books.html" class="btn btn-primary" style="margin-top:16px;">Browse Books</a>
      </div>`;
    if (cartTotalElement) cartTotalElement.textContent = "₹0";
    return;
  }

  let total = 0;
  const rowsHTML = cart.map(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    return `
      <tr data-id="${item.id}">
        <td>
          <img src="${item.image}" alt="${item.title}" width="60" style="border-radius:4px; object-fit:cover;">
        </td>
        <td>
          <strong>${item.title}</strong><br>
          <small style="color:var(--text-muted)">${item.author}</small>
        </td>
        <td>₹${item.price}</td>
        <td>
          <button class="qty-btn" data-id="${item.id}" data-action="minus" style="padding:4px 10px; cursor:pointer;">−</button>
          <span style="margin:0 8px;">${item.quantity}</span>
          <button class="qty-btn" data-id="${item.id}" data-action="plus" style="padding:4px 10px; cursor:pointer;">+</button>
        </td>
        <td style="color:var(--crimson); font-weight:700;">₹${subtotal}</td>
        <td>
          <button class="remove-btn" data-id="${item.id}" style="background:none; border:none; cursor:pointer; font-size:1.2rem; color:var(--crimson);">✕</button>
        </td>
      </tr>
    `;
  }).join("");

  cartItemsContainer.innerHTML = `
    <table class="cart-table" style="width:100%; border-collapse:collapse; background:var(--white); border-radius:10px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.07);">
      <thead>
        <tr style="background:var(--midnight); color:var(--parchment);">
          <th style="padding:14px;">Book</th>
          <th style="padding:14px;">Price</th>
          <th style="padding:14px;">Qty</th>
          <th style="padding:14px;">Subtotal</th>
          <th style="padding:14px;">Remove</th>
        </tr>
      </thead>
      <tbody>${rowsHTML}</tbody>
    </table>
  `;

  if (cartTotalElement) {
    cartTotalElement.innerHTML = `
      <div style="text-align:right; margin-top:24px;">
        <h3 style="font-size:1.5rem; color:var(--primary);">Total: ₹${total}</h3>
        <button class="btn btn-success" style="margin-top:16px; font-size:1rem; padding:14px 32px;">Proceed to Checkout</button>
      </div>
    `;
  }

  attachCartListeners();
}

function attachCartListeners() {
  document.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const id = parseInt(this.dataset.id);
      const action = this.dataset.action;
      const item = cart.find(i => i.id === id);
      if (!item) return;
      if (action === "plus") {
        item.quantity += 1;
      } else if (action === "minus") {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          cart = cart.filter(i => i.id !== id);
        }
      }
      saveCart();
      renderCart();
      updateCartCount();
    });
  });

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const id = parseInt(this.dataset.id);
      if (confirm("Remove this item from cart?")) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCart();
        updateCartCount();
      }
    });
  });
}

// ====================
// INIT
// ====================
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();
});
