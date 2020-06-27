import fetch from 'node-fetch';
// import users from './info.js';

// Add Eventlistener here
document.addEventListener('DOMContentLoaded', function (event) {
  // the event occurred
  console.log('loaded');
  document.getElementById('testButton').addEventListener('click', myFunction);
});

function getNewBlogEntry () {
  console.log('hello');
  return fetch('/blogEntries')
    .then(response => response.text())
    .then(text => console.log(text));
}

function myFunction () {
  console.log('clicked');
  getNewBlogEntry();
}
