// =============================================
// BOOKHIVE - books.js
// Book detail page logic — reads ?id= from URL
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // Only runs on book.html
  const bookDetail = document.querySelector('.book-detail');
  if (!bookDetail) return;

  // Get the book id from the URL e.g. book.html?id=3
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

  // Update page title
  document.title = `${book.title} - BookHive`;

  // Update breadcrumb last item
  const breadcrumbLast = document.querySelector('.breadcrumb ol li:last-child');
  if (breadcrumbLast) breadcrumbLast.textContent = book.title;

  // Fill in book detail content
  bookDetail.querySelector('.book-info h2').textContent = book.title;
  bookDetail.querySelector('.book-info .author strong').textContent = book.author;
  bookDetail.querySelector('.book-info .price').innerHTML =
    `₹${book.price} <small><s>₹${Math.round(book.price * 1.4)}</s> (29% off)</small>`;

  // Update book image
  const img = bookDetail.querySelector('.book-image img');
  if (img) {
    img.src = book.cover;
    img.alt = `${book.title} book cover`;
    img.onerror = () => { img.src = 'assets/books.jpg'; };
  }

  // Fill genre and language fields
  const genreEl = document.getElementById('book-genre');
  const langEl  = document.getElementById('book-lang');
  if (genreEl) genreEl.textContent = book.genre.charAt(0).toUpperCase() + book.genre.slice(1);
  if (langEl)  langEl.textContent  = book.lang.charAt(0).toUpperCase()  + book.lang.slice(1);

  // Wire up Add to Cart button
  const addBtn = bookDetail.querySelector('.btn-primary');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const qty = parseInt(document.getElementById('quantity')?.value || 1);
      for (let i = 0; i < qty; i++) addToCart(book.id);
    });
  }
});
