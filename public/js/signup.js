const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#userPassword').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/homepage');
      } else {
        alert('Failed to sign up.');
      }
    }
  };

  document
  .querySelector('#loginCard')
  .addEventListener('.loginButton', signupFormHandler);