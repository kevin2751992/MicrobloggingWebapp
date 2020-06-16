
import fetch from 'node-fetch';

// Add Eventlistener here
document.addEventListener('DOMContentLoaded', function (event) {
  // the event occurred
  console.log('loaded');
  document.getElementById('testButton').addEventListener('click', myFunction);
});

function postNewBlogEntry (url = 'https://localhost:3000/newBlogEntry', data = {}) {
  console.log('create new BlogEntry');

  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch(url, options).then(response => {
    console.log('fetch', response);

    return response.json();
  });
}

function myFunction () {
  console.log('clicked');

  postNewBlogEntry('https://localhost:8080/newBlogEntry', { title: 'myNewBlogEntry' });
}
