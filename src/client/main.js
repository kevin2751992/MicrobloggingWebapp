
import fetch from 'node-fetch';
import { BlogPosts } from './js/blogPosts';
import { Pagination } from './js/pagination';

window.onload = init;

function init () {
  // the code to be called when the dom has loaded
  // #document has its nodes
  const blogEntriy = new BlogPosts();
  blogEntriy.createBlogPosts();
  const pagination = new Pagination(blogEntriy.blogPostsArray.length);
  pagination.createPagination();

  // Add Eventlistener here
  document.addEventListener('DOMContentLoaded', function (event) {
  // the event occurred
    console.log('loaded');
    document.getElementById('testButton').addEventListener('click', myFunction);
  });
}

function postNewBlogEntry (url = 'http://localhost:8080/newBlogEntry', data = {}) {
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
    console.log('fetch', JSON.stringify(response.body));

    return response.json();
  });
}

function myFunction () {
  console.log('clicked');

  postNewBlogEntry('http://localhost:8080/newBlogEntry', { title: 'myNewBlogEntry' });
}
