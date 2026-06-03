// =============================================
// BOOKHIVE - main.js
// Shared logic: cart count, nav, utilities
// =============================================

// --- Sample Book Data (used across pages) ---
const BOOKS = [
  { id: 1, title: "The White Tiger",      author: "Aravind Adiga",    price: 299,  genre: "fiction",   lang: "english", cover: "images/book1.jpg" },
  { id: 2, title: "Malgudi Days",         author: "R.K. Narayan",     price: 199,  genre: "fiction",   lang: "english", cover: "images/book2.jpg" },
  { id: 3, title: "Wings of Fire",        author: "A.P.J. Abdul Kalam", price: 250, genre: "non-fiction", lang: "english", cover: "images/book3.jpg" },
  { id: 4, title: "Godan",               author: "Munshi Premchand",  price: 149,  genre: "fiction",   lang: "hindi",   cover: "images/book4.jpg" },
  { id: 5, title: "The God of Small Things", author: "Arundhati Roy", price: 350, genre: "fiction",   lang: "english", cover: "images/book5.jpg" },
  { id: 6, title: "Ikigai",              author: "Héctor García",     price: 399,  genre: "self-help", lang: "english", cover: "images/book6.jpg" },
  { id: 7, title: "Panchatantra",        author: "Vishnu Sharma",     price: 120,  genre: "children",  lang: "hindi",   cover: "images/book7.jpg" },
  { id: 8, title: "Discovery of India",  author: "Jawaharlal Nehru",  price: 450,  genre: "history",   lang: "english", cover: "images/book8.jpg" },
];

// --- Cart Utilities (localStorage) ---
function getCart() {
  return JSON.parse(localStorage.getItem('bookhive_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('bookhive_cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(bookId) {
  const cart = getCart();
  const book = BOOKS.find(b => b.id === bookId);
  if (!book) return;
  const existing = cart.find(item => item.id === bookId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...book, qty: 1 });
  }
  saveCart(cart);
  alert(`"${book.title}" added to cart! 🛒`);
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = total;
}

// --- Book Card HTML ---
function createBookCard(book) {
  return `
    <div class="book-card">
      <div style="background:#F0E8D8; height:240px; display:flex; align-items:center; justify-content:center; font-size:3rem;">📖</div>
      <div class="book-card-body">
        <h3>${book.title}</h3>
        <p class="author">${book.author}</p>
        <p class="price">₹${book.price}</p>
        <a href="book.html?id=${book.id}" class="btn btn-outline" style="font-size:0.85rem; padding:6px 14px; margin-right:8px;">Details</a>
        <button class="btn btn-primary" style="font-size:0.85rem; padding:6px 14px;" onclick="addToCart(${book.id})">Add to Cart</button>
      </div>
    </div>`;
}

// --- On page load ---
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // Render featured books on homepage
  const featuredEl = document.getElementById('featuredBooks');
  if (featuredEl) {
    BOOKS.slice(0, 4).forEach(book => {
      featuredEl.innerHTML += createBookCard(book);
    });
  }
});
