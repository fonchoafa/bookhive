// =============================================
// BOOKHIVE - search.js
// Search functionality for books page
// =============================================

function searchBooks() {
  const query = document.getElementById('searchInput')?.value.toLowerCase().trim() || '';
  if (!query) {
    renderBooks(BOOKS);
    return;
  }
  const results = BOOKS.filter(b =>
    b.title.toLowerCase().includes(query) ||
    b.author.toLowerCase().includes(query) ||
    b.genre.toLowerCase().includes(query)
  );
  renderBooks(results);
}

// Search on Enter key
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') searchBooks();
    });
  }
});
