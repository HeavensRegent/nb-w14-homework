const postBlogHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();
  const userId = document.querySelector('.user').id;
  const blogId = document.querySelector('.blog').id;

  if (blogId && title && content && userId) {
    const response = await fetch('/api/blogs/' + blogId, {
      method: 'PUT',
      body: JSON.stringify({ title, content, userId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/blog/${blogId}`);
    } else {
      alert(response.statusText);
    }
  } else if (title && content && userId) {
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify({ title, content, userId }),
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
  .querySelector('.blog-post')
  .addEventListener('submit', postBlogHandler);
