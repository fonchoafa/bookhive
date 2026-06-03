// =============================================
// BOOKHIVE - Search & Filter (search.js)
// Live search, category filter, sort
// =============================================

// ====================
// FILTER & SEARCH LOGIC
// ====================
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const sortSelect = document.getElementById("sort");

function applyFilters() {
  let filteredBooks = [...books];

  // 1. Search filter
  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
  if (searchTerm) {
    filteredBooks = filteredBooks.filter(book =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm)
    );
  }

  // 2. Category filter
  const selectedCategory = categoryFilter ? categoryFilter.value : "all";
  if (selectedCategory && selectedCategory !== "all") {
    filteredBooks = filteredBooks.filter(book => book.category === selectedCategory);
  }

  // 3. Sort
  const sortBy = sortSelect ? sortSelect.value : "default";
  switch (sortBy) {
    case "price-low":
      filteredBooks.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredBooks.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filteredBooks.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  renderBooks(filteredBooks);
  showResultCount(filteredBooks.length);
}

function showResultCount(count) {
  let countDisplay = document.getElementById("result-count");
  if (!countDisplay) {
    countDisplay = document.createElement("p");
    countDisplay.id = "result-count";
    countDisplay.style.cssText = "text-align:center; color:#666; margin:8px 0;";
    const grid = document.getElementById("books-container");
    if (grid && grid.parentNode) {
      grid.parentNode.insertBefore(countDisplay, grid);
    }
  }
  countDisplay.textContent = `Showing ${count} book${count !== 1 ? 's' : ''}`;
}

// ====================
// EVENT LISTENERS
// ====================
if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
}
if (categoryFilter) {
  categoryFilter.addEventListener("change", applyFilters);
}
if (sortSelect) {
  sortSelect.addEventListener("change", applyFilters);
}

// Run on page load if on books page
document.addEventListener('DOMContentLoaded', () => {
  if (searchInput || categoryFilter) {
    applyFilters();
  }
});
