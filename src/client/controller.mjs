import fetch from 'node-fetch';
require('node-fetch');

export async function postNewBlogEntry (url = 'https://localhost:8080/newBlogEntry', data = {}) {
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  const response = await fetch(url, options);
  return response.json();
}
