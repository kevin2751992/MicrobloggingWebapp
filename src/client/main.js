
// import fetch from 'node-fetch';
import { BlogPosts } from './components/blogPosts';
import { Pagination } from './components/pagination';
import { Modal } from './components/modal';
import { Blogservice } from './service/blogservice';

window.onload = init;

function init () {
  // the code to be called when the dom has loaded
  // #document has its nodes
  const blogservice = new Blogservice();
  blogservice.getBlogPosts().then(promisedBlogPosts => {
    const blogPosts = new BlogPosts(promisedBlogPosts);
    blogPosts.createBlogPosts();
    const pagination = new Pagination(blogPosts.blogPostsArray.length);
    pagination.createPagination();
  });

  document.getElementById('createButton').addEventListener('click', openModal);
}
function openModal () {
  const modal = new Modal();
  console.log('modal', modal);
}

/* function postNewBlogEntry (url = 'http://localhost:8080/newBlogEntry', data = {}) {
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
} */
