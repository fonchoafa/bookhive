// =============================================
// BOOKHIVE - Book Database (books.js)
// Array of objects + dynamic card generation
// =============================================

// ====================
// BOOK DATABASE
// ====================
const books = [
  {
    id: 1,
    title: "Wings of Fire",
    author: "A.P.J. Abdul Kalam",
    category: "biography",
    price: 299,
    originalPrice: 499,
    rating: 4.8,
    reviews: 2341,
    image: "images/books/wings-of-fire.jpg",
    description: "Autobiography of India's beloved former president.",
    inStock: true
  },
  {
    id: 2,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "fiction",
    price: 349,
    originalPrice: 499,
    rating: 4.7,
    reviews: 5012,
    image: "images/books/the-alchemist.jpg",
    description: "A magical story about pursuing your dreams.",
    inStock: true
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    category: "self-help",
    price: 499,
    originalPrice: 799,
    rating: 4.9,
    reviews: 8420,
    image: "images/books/atomic-habits.jpg",
    description: "Tiny changes, remarkable results.",
    inStock: true
  },
  {
    id: 4,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "history",
    price: 599,
    originalPrice: 899,
    rating: 4.6,
    reviews: 12450,
    image: "images/books/sapiens.jpg",
    description: "A brief history of humankind.",
    inStock: true
  },
  {
    id: 5,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "business",
    price: 350,
    originalPrice: 499,
    rating: 4.5,
    reviews: 6800,
    image: "images/books/rich-dad.jpg",
    description: "What the rich teach their kids about money.",
    inStock: true
  },
  {
    id: 6,
    title: "Five Point Someone",
    author: "Chetan Bhagat",
    category: "fiction",
    price: 199,
    originalPrice: 299,
    rating: 4.3,
    reviews: 9200,
    image: "images/books/five-point.jpg",
    description: "What not to do at IIT.",
    inStock: false
  },
  {
    id: 7,
    title: "The Power of Subconscious Mind",
    author: "Joseph Murphy",
    category: "self-help",
    price: 249,
    originalPrice: 399,
    rating: 4.6,
    reviews: 4100,
    image: "images/books/subconscious.jpg",
    description: "Unlock the power within you.",
    inStock: true
  },
  {
    id: 8,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    category: "business",
    price: 299,
    originalPrice: 499,
    rating: 4.7,
    reviews: 7300,
    image: "images/books/think-grow.jpg",
    description: "The classic guide to success.",
    inStock: true
  },
  {
    id: 9,
    title: "The White Tiger",
    author: "Aravind Adiga",
    category: "fiction",
    price: 299,
    originalPrice: 449,
    rating: 4.5,
    reviews: 1890,
    image: "images/books/white-tiger.jpg",
    description: "A darkly comic view of modern India.",
    inStock: true
  },
  {
    id: 10,
    title: "Malgudi Days",
    author: "R.K. Narayan",
    category: "fiction",
    price: 199,
    originalPrice: 299,
    rating: 4.6,
    reviews: 3210,
    image: "images/books/malgudi-days.jpg",
    description: "Timeless stories from the fictional town of Malgudi.",
    inStock: true
  },
  {
    id: 11,
    title: "The God of Small Things",
    author: "Arundhati Roy",
    category: "fiction",
    price: 349,
    originalPrice: 499,
    rating: 4.7,
    reviews: 4100,
    image: "images/books/god-of-small-things.jpg",
    description: "The poignant story of twins in Kerala.",
    inStock: true
  },
  {
    id: 12,
    title: "The Discovery of India",
    author: "Jawaharlal Nehru",
    category: "history",
    price: 450,
    originalPrice: 599,
    rating: 4.6,
    reviews: 2780,
    image: "images/books/discovery-of-india.jpg",
    description: "A vision of India's past and future.",
    inStock: true
  }
];

console.log(`Loaded ${books.length} books`);

// ====================
// DYNAMIC BOOK CARDS
// ====================
function createBookCard(book) {
  return `
    <article class="book-card" data-id="${book.id}">
      <img src="${book.image}" alt="${book.title}" loading="lazy">
      <h3>${book.title}</h3>
      <p class="author">${book.author}</p>
      <p class="rating">⭐ ${book.rating} (${book.reviews.toLocaleString()} reviews)</p>
      <p class="price">
        ₹${book.price}
        <small><s>₹${book.originalPrice}</s></small>
      </p>
      <button
        class="add-to-cart"
        data-id="${book.id}"
        ${!book.inStock ? "disabled" : ""}
      >
        ${book.inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </article>
  `;
}

function renderBooks(bookList) {
  const container = document.getElementById("books-container");
  if (!container) return;
  if (bookList.length === 0) {
    container.innerHTML = '<p style="text-align:center; padding:40px;">No books found matching your filters.</p>';
    return;
  }
  container.innerHTML = bookList.map(book => createBookCard(book)).join("");
}

// ====================
// ARRAY METHODS DEMO
// ====================
function demoArrayMethods() {
  // map() - get just titles
  const titles = books.map(book => book.title);
  console.log("All titles:", titles);

  // filter() - books in stock
  const availableBooks = books.filter(book => book.inStock);
  console.log(`In stock: ${availableBooks.length}`);

  // filter() - fiction books
  const fictionBooks = books.filter(book => book.category === "fiction");

  // filter() - books under ₹300
  const cheapBooks = books.filter(book => book.price < 300);

  // reduce() - total catalog value
  const totalValue = books.reduce((sum, book) => sum + book.price, 0);
  console.log("Total catalog value: ₹" + totalValue);

  // reduce() - average rating
  const avgRating = (books.reduce((sum, book) => sum + book.rating, 0) / books.length).toFixed(1);
  console.log("Average rating:", avgRating);

  // sort() - price low to high (copy first!)
  const sortedByPrice = [...books].sort((a, b) => a.price - b.price);

  // find() - find a specific book
  const wingsOfFire = books.find(book => book.id === 1);
  console.log("Found:", wingsOfFire ? wingsOfFire.title : "Not found");

  // Cheapest book
  const cheapest = [...books].sort((a, b) => a.price - b.price)[0];
  console.log("Cheapest:", cheapest.title, "₹" + cheapest.price);

  // Books by category
  const byCategory = books.reduce((groups, book) => {
    if (!groups[book.category]) groups[book.category] = [];
    groups[book.category].push(book);
    return groups;
  }, {});
  console.log("By category:", byCategory);
}

// ====================
// FILTER & SEARCH LOGIC
// ====================
function getFilteredBooks(category, searchTerm, sortBy) {
  let result = [...books];

  // Filter by category
  if (category && category !== "all") {
    result = result.filter(book => book.category === category);
  }

  // Filter by search term
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    result = result.filter(book =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term)
    );
  }

  // Sort
  switch (sortBy) {
    case "price-low":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return result;
}

// ====================
// ON PAGE LOAD
// ====================
document.addEventListener('DOMContentLoaded', () => {
  // Render all books on the books listing page
  renderBooks(books);

  // Run array demos in console
  demoArrayMethods();

  // Search box
  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");
  const sortSelect = document.getElementById("sort");

  function applyFilters() {
    const category = categoryFilter ? categoryFilter.value : "all";
    const search = searchInput ? searchInput.value : "";
    const sort = sortSelect ? sortSelect.value : "default";
    const filtered = getFilteredBooks(category, search, sort);
    renderBooks(filtered);
  }

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (categoryFilter) categoryFilter.addEventListener("change", applyFilters);
  if (sortSelect) sortSelect.addEventListener("change", applyFilters);

  // Add to cart delegation (works for dynamically generated buttons)
  const booksContainer = document.getElementById("books-container");
  if (booksContainer) {
    booksContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) {
        const bookId = parseInt(e.target.dataset.id);
        if (typeof addToCart === "function") {
          addToCart(bookId);
        }
      }
    });
  }
});
