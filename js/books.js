// =============================================
// BOOKHIVE - books.js
// Books listing page & book detail page logic
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------
  // BOOK DETAIL PAGE (book.html)
  // ----------------------------------------
  const bookDetail = document.querySelector('.book-detail');
  if (bookDetail) {

    const params = new URLSearchParams(window.location.search);
    const bookId = parseInt(params.get('id'));
    const book = BOOKS.find(b => b.id === bookId);

    if (!book) {
      bookDetail.innerHTML = `
        <div style="padding:60px; text-align:center; grid-column:1/-1;">
          <h2>Book not found</h2>
          <p style="margin:16px 0;">Sorry, we couldn't find that book.</p>
          <a href="books.html" class="btn-primary" style="display:inline-block; width:auto; padding:12px 28px;">Back to Books</a>
        </div>`;
      return;
    }

    // Update page title and breadcrumb
    document.title = `${book.title} - BookHive`;
    const breadcrumbLast = document.querySelector('.breadcrumb ol li:last-child');
    if (breadcrumbLast) breadcrumbLast.textContent = book.title;

    // Fill in all dynamic fields
    bookDetail.querySelector('.book-info h2').textContent = book.title;
    bookDetail.querySelector('.book-info .author strong').textContent = book.author;
    bookDetail.querySelector('.book-info .price').innerHTML =
      `₹${book.price} <small><s>₹${Math.round(book.price * 1.4)}</s> (29% off)</small>`;

    // Book image with fallback
    const img = bookDetail.querySelector('.book-image img');
    if (img) {
      img.src = book.cover;
      img.alt = `${book.title} book cover`;
      img.onerror = () => { img.src = 'assets/books.jpg'; };
    }

    // Genre and language
    const genreEl = document.getElementById('book-genre');
    const langEl  = document.getElementById('book-lang');
    if (genreEl) genreEl.textContent = book.genre.charAt(0).toUpperCase() + book.genre.slice(1);
    if (langEl)  langEl.textContent  = book.lang.charAt(0).toUpperCase()  + book.lang.slice(1);

    // Add to Cart button
    const addBtn = bookDetail.querySelector('.btn-primary');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const qty = parseInt(document.getElementById('quantity')?.value || 1);
        for (let i = 0; i < qty; i++) addToCart(book.id);
      });
    }

    return; // Don't run listing logic on detail page
  }

  // ----------------------------------------
  // BOOKS LISTING PAGE (books.html)
  // ----------------------------------------
  const container = document.getElementById('books-container');
  if (!container) return;

  // Check if a category was passed from the homepage e.g. books.html?category=fiction
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');

  if (categoryParam) {
    // Pre-select the dropdown to match the category
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
      // Match against value or lang field
      const matchOption = [...categoryFilter.options].find(o => o.value === categoryParam);
      if (matchOption) categoryFilter.value = categoryParam;
    }

    // Filter books by genre OR lang matching the category param
    const filtered = BOOKS.filter(b =>
      b.genre === categoryParam || b.lang === categoryParam
    );
    renderBooks(filtered.length > 0 ? filtered : BOOKS);
    attachAddToCartListeners();
  }

  // Price slider live label update
  const priceSlider = document.getElementById('filterPrice');
  if (priceSlider) {
    priceSlider.addEventListener('input', () => {
      const valEl = document.getElementById('priceVal');
      if (valEl) valEl.textContent = priceSlider.value;
    });
  }
});

// Render array of books into #books-container
function renderBooks(books) {
  const container = document.getElementById('books-container');
  if (!container) return;
  if (books.length === 0) {
    container.innerHTML = `<p class="no-results">No books found. <a href="books.html">Clear filters</a></p>`;
    return;
  }
  container.innerHTML = books.map(book => createBookCard(book)).join('');
  attachAddToCartListeners();
}

// Filter books from sidebar controls
function filterBooks() {
  const genre    = document.getElementById('category-filter')?.value || 'all';
  const maxPrice = parseInt(document.getElementById('filterPrice')?.value || 2000);

  const filtered = BOOKS.filter(b =>
    (genre === 'all' || b.genre === genre) &&
    b.price <= maxPrice
  );
  renderBooks(filtered);
}
