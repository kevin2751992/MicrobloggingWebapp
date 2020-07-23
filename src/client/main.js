
// import fetch from 'node-fetch';
import { BlogPosts } from './components/blogPosts';
import { Pagination } from './components/pagination';
import { Modal } from './components/modal';
import { Blogservice } from './service/blogservice';
import { HighlightContent } from './components/highlightContent';

window.onload = init;
const blogservice = new Blogservice();
let pagination = null;

function init () {
  // the code to be called when the dom has loaded
  // #document has its nodes

  blogservice.getBlogPosts().then(promisedBlogPosts => {
    const sortedBlogPosts = blogservice.sortBlogPost(promisedBlogPosts);
    const blogPosts = new BlogPosts(sortedBlogPosts, blogservice);
    blogPosts.createBlogPosts();
    pagination = new Pagination(blogPosts.blogPostsArray.length, blogPosts.mapps);
    pagination.createPagination();
  });
  blogservice.createTestData();
  const highlightContent = new HighlightContent(blogservice.blogPosts);
  highlightContent.initView();
  highlightContent.carousel();

  document.getElementById('createButton').addEventListener('click', openModal);
}
function openModal () {
  const modal = new Modal(blogservice, pagination);
  console.log('modal', modal);
}
