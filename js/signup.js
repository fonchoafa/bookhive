// =============================================
// BOOKHIVE - Sign Up Validation (signup.js)
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('.signup-form');
  if (!signupForm) return;

  signupForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const city = document.getElementById('city').value;
    const terms = document.getElementById('terms').checked;

    // Validation
    if (fullname.length < 3) {
      alert('Please enter your full name (at least 3 characters)');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (phone && !/^[0-9]{10}$/.test(phone)) {
      alert('Phone number must be exactly 10 digits');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (!terms) {
      alert('Please accept the Terms and Conditions');
      return;
    }

    const newUser = {
      fullname,
      email,
      phone,
      city,
      signupDate: new Date().toISOString()
    };

    localStorage.setItem('bookhive-user', JSON.stringify(newUser));
    alert(`Welcome to BookHive, ${fullname}! 🛒`);
    window.location.href = 'index.html';
  });
});
