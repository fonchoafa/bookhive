// =============================================
// BOOKHIVE - Login Toggle (login.js)
// Password visibility toggle
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password');
  const toggleBtn = document.getElementById('toggle-password');
  if (!passwordInput || !toggleBtn) return;

  toggleBtn.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      this.textContent = '🙈';
    } else {
      passwordInput.type = 'password';
      this.textContent = '👁️';
    }
  });
});
