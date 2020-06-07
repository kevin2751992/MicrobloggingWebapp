import { controller } from './controller.mjs';
require('./controller');

// Add Eventlistener here
document.addEventListener('DOMContentLoaded', function (event) {
  // the event occurred
  console.log('loaded');
  document.getElementById('testButton').addEventListener('click', myFunction);
});

function myFunction () {
  console.log('clicked');
  controller.postNewBlogEntry('https://localhost:8080/newBlogEntry', { title: 'myNewBlogEntry' });
}
