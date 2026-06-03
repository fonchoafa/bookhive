// =============================================
// BOOKHIVE - cart.js
// Shopping cart display and management
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});

function renderCart() {
  const cart = getCart();
  const cartItemsEl = document.getElementById('cartItems');
  const cartSummaryEl = document.getElementById('cartSummary');
  if (!cartItemsEl) return;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div style="text-align:center; padding:60px 0;">
        <p style="font-size:3rem;">🛒</p>
        <h3>Your cart is empty</h3>
        <a href="books.html" class="btn btn-primary" style="margin-top:16px;">Browse Books</a>
      </div>`;
    cartSummaryEl.innerHTML = '';
    return;
  }

  let total = 0;
  let html = `<table style="width:100%; border-collapse:collapse;" class="cart-table">
    <thead>
      <tr style="background:var(--midnight); color:var(--parchment);">
        <th style="padding:14px;">Book</th>
        <th style="padding:14px;">Price</th>
        <th style="padding:14px;">Qty</th>
        <th style="padding:14px;">Subtotal</th>
        <th style="padding:14px;">Remove</th>
      </tr>
    </thead>
    <tbody>`;

  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    html += `
      <tr style="border-bottom:1px solid #eee;">
        <td style="padding:14px; font-weight:600;">${item.title}<br><small style="color:var(--text-muted)">${item.author}</small></td>
        <td style="padding:14px;">₹${item.price}</td>
        <td style="padding:14px;">
          <button onclick="changeQty(${item.id}, -1)" style="padding:4px 10px; cursor:pointer;">−</button>
          <span style="margin:0 8px;">${item.qty}</span>
          <button onclick="changeQty(${item.id}, +1)" style="padding:4px 10px; cursor:pointer;">+</button>
        </td>
        <td style="padding:14px; color:var(--crimson); font-weight:700;">₹${subtotal}</td>
        <td style="padding:14px;"><button onclick="removeFromCart(${item.id})" style="color:var(--crimson); background:none; border:none; cursor:pointer; font-size:1.2rem;">✕</button></td>
      </tr>`;
  });

  html += `</tbody></table>`;
  cartItemsEl.innerHTML = html;
  cartSummaryEl.innerHTML = `
    <h3>Total: ₹${total}</h3>
    <button class="btn btn-success" style="margin-top:16px; font-size:1rem; padding:14px 32px;">Proceed to Checkout</button>`;
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart.splice(cart.indexOf(item), 1);
  saveCart(cart);
  renderCart();
}

function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
}
