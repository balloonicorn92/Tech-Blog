async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const blog_text = document.querySelector('textarea[name="blog_text"]').value;
    
    console.log("hit")
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        blog_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
        document.location.reload()
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);