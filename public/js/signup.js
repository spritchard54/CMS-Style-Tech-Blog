const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#input-name').value.trim();
    const password = document.querySelector('#input-password').value.trim();
    const email = document.querySelector('#input-email').value.trim();
console.log(email);
    
  
    if (username && password && email) {
      // console.error(err);
      const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ username, password, email }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        console.log('there');
        document.location.replace('/');
      } else {
        console.log('Another place');
        alert('Failed to sign up.');
      }
    }
  };

  document
  .querySelector('#login-form')
  .addEventListener('submit', signupFormHandler);