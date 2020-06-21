import fetch from 'node-fetch';
import { BlogPosts } from './js/blogPosts';
import { Pagination } from './js/pagination';

window.onload = init;
document.addEventListener('DOMContentLoaded', function (event) {
  // the event occurred
  console.log('loaded');
  document.getElementById('testButton').addEventListener('click', myFunction);
});

function init () {
  // the code to be called when the dom has loaded
  // #document has its nodes
  const blogEntriy = new BlogPosts();
  blogEntriy.createBlogPosts();
  const pagination = new Pagination(blogEntriy.blogPostsArray.length);
  pagination.createPagination();

  // Add Eventlistener here
}

function getNewBlogEntry () {
  console.log('hello');
  return fetch('/blogEntries')
    .then(response => response.json())
    .then(data => console.log(data));
}

function myFunction () {
  console.log('clicked');
  getNewBlogEntry();
}
