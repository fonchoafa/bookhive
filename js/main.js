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
// DOM MANIPULATION
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

// ====================
// BOOK DATA
// ====================
const BOOKS = [
  { id: 1,  title: "The White Tiger",         author: "Aravind Adiga",        price: 299,  genre: "fiction",     lang: "english", cover: "images/books/white-tiger.jpg" },
  { id: 2,  title: "Malgudi Days",            author: "R.K. Narayan",         price: 199,  genre: "fiction",     lang: "english", cover: "images/books/malgudi-days.jpg" },
  { id: 3,  title: "Wings of Fire",           author: "A.P.J. Abdul Kalam",   price: 299,  genre: "biography",   lang: "english", cover: "images/books/wings-of-fire.jpg" },
  { id: 4,  title: "Godan",                   author: "Munshi Premchand",     price: 149,  genre: "fiction",     lang: "hindi",   cover: "images/books/godan.jpg" },
  { id: 5,  title: "The God of Small Things", author: "Arundhati Roy",        price: 349,  genre: "fiction",     lang: "english", cover: "images/books/god-of-small-things.jpg" },
  { id: 6,  title: "Ikigai",                  author: "Héctor García",        price: 399,  genre: "self-help",   lang: "english", cover: "images/books/ikigai.jpg" },
  { id: 7,  title: "Panchatantra",            author: "Vishnu Sharma",        price: 120,  genre: "children",    lang: "hindi",   cover: "images/books/panchatantra.jpg" },
  { id: 8,  title: "The Discovery of India",  author: "Jawaharlal Nehru",     price: 450,  genre: "history",     lang: "english", cover: "images/books/discovery-of-india.jpg" },
  { id: 9,  title: "The Alchemist",           author: "Paulo Coelho",         price: 349,  genre: "fiction",     lang: "english", cover: "images/books/the-alchemist.jpg" },
  { id: 10, title: "Atomic Habits",           author: "James Clear",          price: 499,  genre: "self-help",   lang: "english", cover: "images/books/atomic-habits.jpg" },
  { id: 11, title: "Rich Dad Poor Dad",       author: "Robert Kiyosaki",      price: 329,  genre: "business",    lang: "english", cover: "images/books/rich-dad-poor-dad.jpg" },
  { id: 12, title: "Sapiens",                 author: "Yuval Noah Harari",    price: 599,  genre: "history",     lang: "english", cover: "images/books/sapiens.jpg" },
];

// ====================
// LOADING STATE
// ====================

// Show loader while books are being rendered
function showLoader() {
  const container = document.getElementById("books-container");
  if (container) {
    container.innerHTML = `
      <div class="loader-wrapper">
        <div class="loader-spinner"></div>
        <p class="loader-text">Loading books for you...</p>
      </div>
    `;
  }
}

// Simulate loading delay (visual effect), then render books
function loadBooksWithDelay() {
  const container = document.getElementById("books-container");
  if (!container) return;
  showLoader();
  setTimeout(() => {
    renderBooks(BOOKS);
    attachAddToCartListeners();
  }, 500);
}

// ====================
// CART UTILITIES (localStorage)
// ====================

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

// ====================
// BOOK CARD TEMPLATE
// ====================

function createBookCard(book) {
  return `
    <article class="book-card">
      <a href="book.html?id=${book.id}">
        <img src="${book.cover}" alt="${book.title} book cover"
             loading="lazy"
             onerror="this.src='assets/books.jpg'"
        />
      </a>
      <h3><a href="book.html?id=${book.id}" style="color:inherit;">${book.title}</a></h3>
      <p class="author">${book.author}</p>
      <p class="price">₹${book.price}</p>
      <a href="book.html?id=${book.id}" class="btn-outline-small">View Details</a>
      <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
    </article>`;
}

// Render a list of books into #books-container
function renderBooks(books) {
  const container = document.getElementById("books-container");
  if (!container) return;
  if (books.length === 0) {
    container.innerHTML = `<p class="no-results">No books found. <a href="books.html">Clear filters</a></p>`;
    return;
  }
  container.innerHTML = books.map(book => createBookCard(book)).join('');
}

// Attach click listeners to all Add to Cart buttons
function attachAddToCartListeners() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      addToCart(id);
    });
  });
}

// ====================
// PAGE INIT
// ====================

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // Books listing page — load with spinner
  if (document.getElementById("books-container")) {
    loadBooksWithDelay();
  }

  // Homepage featured books (no delay needed)
  const featuredEl = document.getElementById("featured-books");
  if (featuredEl) {
    featuredEl.innerHTML = BOOKS.slice(0, 6).map(book => createBookCard(book)).join('');
    attachAddToCartListeners();
  }
});
