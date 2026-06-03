// =============================================
// BOOKHIVE - books.js
// Books listing page & book detail page logic
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Books Listing Page ---
  const booksGrid = document.getElementById('booksGrid');
  if (booksGrid) {
    renderBooks(BOOKS);
    // Price slider live update
    const priceSlider = document.getElementById('filterPrice');
    if (priceSlider) {
      priceSlider.addEventListener('input', () => {
        document.getElementById('priceVal').textContent = priceSlider.value;
      });
    }
  }

  // --- Book Detail Page ---
  const bookDetail = document.getElementById('bookDetail');
  if (bookDetail) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const book = BOOKS.find(b => b.id === id);
    if (book) {
      document.title = `${book.title} - BookHive`;
      bookDetail.innerHTML = `
        <div style="background:#F0E8D8; height:380px; display:flex; align-items:center; justify-content:center; font-size:6rem; border-radius:10px;">📖</div>
        <div>
          <h1>${book.title}</h1>
          <p class="author" style="font-size:1.1rem; color:var(--text-muted); margin:8px 0;">By ${book.author}</p>
          <p class="price">₹${book.price}</p>
          <p class="description">
            A celebrated work of Indian literature exploring themes of culture, identity,
            and the human experience. Available in ${book.lang}.
          </p>
          <div style="display:flex; gap:16px; flex-wrap:wrap;">
            <button class="btn btn-primary" onclick="addToCart(${book.id})">🛒 Add to Cart</button>
            <a href="books.html" class="btn btn-outline">← Back to Books</a>
          </div>
        </div>`;
    } else {
      bookDetail.innerHTML = '<p>Book not found. <a href="books.html">Browse all books</a></p>';
    }
  }
});

function renderBooks(books) {
  const grid = document.getElementById('booksGrid');
  if (!grid) return;
  if (books.length === 0) {
    grid.innerHTML = '<p>No books found matching your filters.</p>';
    return;
  }
  grid.innerHTML = books.map(book => createBookCard(book)).join('');
}

function filterBooks() {
  const genre = document.getElementById('filterGenre')?.value || '';
  const lang  = document.getElementById('filterLang')?.value  || '';
  const maxPrice = parseInt(document.getElementById('filterPrice')?.value || 2000);
  const filtered = BOOKS.filter(b =>
    (!genre || b.genre === genre) &&
    (!lang  || b.lang  === lang)  &&
    b.price <= maxPrice
  );
  renderBooks(filtered);
}
