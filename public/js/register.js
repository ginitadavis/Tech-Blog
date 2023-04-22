const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const firstName = document.querySelector('#firstName').value.trim();
    const lastName = document.querySelector('#lastName').value.trim();
    const user_name = document.querySelector('#user_name').value.trim();
    const email_address = document.querySelector('#email_address').value.trim();
    const userPassword = document.querySelector('#userPassword').value.trim();

    console.log(`${firstName} ${lastName} ${email} ${password}`);
  
    if (firstName && lastName && user_name && email && password) {

      console.log(` Enters here again ${firstName} ${lastName} ${user_name} ${email_address} ${userPassword}`);
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, user_name, email_address, userPassword }),
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
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);