// =============================================
// BOOKHIVE - main.js
// Shared logic: cart count, nav, utilities
// =============================================

// ====================
// VARIABLES - Store Data
// ====================
const SITE_NAME = "BookHive";
const FOUNDED_YEAR = 2026;
const PI = 3.14159;

let cartCount = 0;
let totalAmount = 0;
let currentUser = null;

console.log(SITE_NAME);
console.log("Founded:", FOUNDED_YEAR);
console.log("Cart count:", cartCount);

cartCount = 3;
totalAmount = 1497;
console.log("New cart count:", cartCount);
console.log("Total amount: ₹" + totalAmount);

// ====================
// DATA TYPES IN JAVASCRIPT
// ====================
const bookTitle = "Wings of Fire";
const author = 'A.P.J. Abdul Kalam';
const description = `Bestseller since 1999`;

const price = 299;
const discount = 0.20;
const rating = 4.8;

const isInStock = true;
const isOnSale = false;

const couponCode = null;
let promoMessage;

console.log(typeof bookTitle);
console.log(typeof price);
console.log(typeof isInStock);
console.log(typeof promoMessage);

// ====================
// TEMPLATE LITERALS - Smart Strings
// ====================
const message1 = "Hello, " + author + "! Your book '" + bookTitle + "' costs ₹" + price;
const message2 = `Hello, ${author}! Your book '${bookTitle}' costs ₹${price}`;
console.log(message1);
console.log(message2);

const productCard = `
  <div class="book-card">
    <h3>${bookTitle}</h3>
    <p>by ${author}</p>
    <p>₹${price}</p>
  </div>
`;
console.log(productCard);

// ====================
// MATH FOR BOOKHIVE
// ====================
const bookPrice = 299;
const quantity = 3;
const subtotal = bookPrice * quantity;
const tax = subtotal * 0.05;
const total = subtotal + tax;
const discountAmt = total * 0.10;
const finalPrice = total - discountAmt;
console.log("Subtotal:", subtotal);
console.log("Tax:", tax);
console.log("Total:", total);
console.log("After discount:", finalPrice.toFixed(2));

// ====================
// DOM MANIPULATION - First Time!
// ====================
const heroTitle = document.getElementById("hero-title");
const heroSubtitle = document.getElementById("hero-subtitle");
const cartCountElement = document.getElementById("cart-count");
if (cartCountElement) {
  cartCountElement.textContent = cartCount;
}

const currentHour = new Date().getHours();
let greeting;
if (currentHour < 12) {
  greeting = "Good Morning! ☀️";
} else if (currentHour < 17) {
  greeting = "Good Afternoon! 🌤️";
} else {
  greeting = "Good Evening! 🌙";
}
if (heroSubtitle) {
  heroSubtitle.textContent = `${greeting} Find your next great read.`;
}

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
  const countEl = document.getElementById("cart-count");
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
});
