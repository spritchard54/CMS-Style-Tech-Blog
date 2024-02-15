const commentHandler = async (event) => {
    event.preventDefault();

    
    const title = document.querySelector('#content-title').value.trim();
    const content = document.querySelector('#content-input').value.trim();
   
    
  
    if (title && content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to add comment.');
        }
    }
};

document
    .querySelector('#new-post')
    .addEventListener('submit', commentHandler);