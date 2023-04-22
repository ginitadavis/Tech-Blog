// const { response } = require("express");

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email_address = document.querySelector('#email-login').value.trim();
  const userPassword = document.querySelector('#password-login').value.trim();

  if (email_address && userPassword) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email_address, userPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log(response.statusText);
    }
  }
};


document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);


