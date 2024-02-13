const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log('start');
  const username = document.querySelector('#user-login').value.trim();
  const password = document.querySelector('#user-password').value.trim();
  console.log(`${username}   ${password}`);

  if (username && password) {
    console.log('here');
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (response.ok) {
      console.log('there');
      document.location.replace('/');
    } else {
      console.log('Another place');
      alert('Failed to log in.');
    }
  }
};

document
  .querySelector('#loginForm')
  .addEventListener('submit', loginFormHandler);
