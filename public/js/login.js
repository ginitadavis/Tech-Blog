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

const signupFormHandler = async (event) => {
  console.log("enters here")
  event.preventDefault();

  const firstName = document.querySelector('#firstName').value.trim();
  const lastName = document.querySelector('#lastName').value.trim();
  const user_name = document.querySelector('#user_name').value.trim();
  const email_address  = document.querySelector('#email_address').value.trim();
  const userPassword = document.querySelector('#userPassword').value.trim();

  if (firstName && lastName && user_name && email_address && userPassword) {
console.log(firstName,lastName, user_name, email_address, userPassword);
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ firstName,lastName, user_name, email_address, userPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('click', loginFormHandler);

  document
  .querySelector('.signup-form')
  .addEventListener('click', signupFormHandler);
