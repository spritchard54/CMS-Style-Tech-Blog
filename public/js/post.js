console.log('post.js script is connected');
const commentHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title-input').value.trim();
  const content = document.querySelector('#content-input').value.trim();

  if (title && content) {
    const response = await fetch('/api/posts/new', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
        user_id,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('line 18 post.js'); //Console

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to add comment.');
    }
  }
};

document.querySelector('#post-submit').addEventListener('submit', commentHandler);
