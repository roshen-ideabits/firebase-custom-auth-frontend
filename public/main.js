const API_BASE_URL = window.AUTH_API_BASE_URL || 'http://localhost:4000';

const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');
const showLoginBtn = document.querySelector('#show-login');
const showRegisterBtn = document.querySelector('#show-register');
const feedback = document.querySelector('#feedback');

const setActiveForm = (form) => {
  if (form === 'login') {
    loginForm.classList.add('visible');
    registerForm.classList.remove('visible');
    showLoginBtn.classList.add('active');
    showRegisterBtn.classList.remove('active');
  } else {
    loginForm.classList.remove('visible');
    registerForm.classList.add('visible');
    showLoginBtn.classList.remove('active');
    showRegisterBtn.classList.add('active');
  }
  feedback.textContent = '';
};

showLoginBtn.addEventListener('click', () => setActiveForm('login'));
showRegisterBtn.addEventListener('click', () => setActiveForm('register'));

async function handleSubmit(event, endpoint) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const payload = Object.fromEntries(formData.entries());

  feedback.textContent = 'Working…';
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    feedback.textContent = `Success! Custom token: ${data.customToken.slice(0, 18)}…`;
  } catch (err) {
    feedback.textContent = `Error: ${err.message}`;
  }
}

loginForm.addEventListener('submit', (event) => handleSubmit(event, 'login'));
registerForm.addEventListener('submit', (event) => handleSubmit(event, 'register'));
