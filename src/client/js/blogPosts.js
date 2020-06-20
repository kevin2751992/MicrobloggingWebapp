import { Blogservice } from '../service/blogservice';
// import { Modal } from './components/Modal';

export class BlogPosts {
  constructor () {
    const blogservice = new Blogservice();
    this.blogPostsArray = blogservice.blogPosts;
    console.log('TestData', this.blogPostsArray);
  }

  createBlogPosts () {
    console.log('create BlogPosts', document);
    // get BlogPostContainer from document by its id
    const bloggingContainer = document.getElementById('bloggingContainer');
    // Create for each BlogPost a BlogPostElement and append it to the container
    this.blogPostsArray.forEach(item => {
      // Create BlogPostDiv and add its css class to it
      const blogPostContainer = document.createElement('div');
      blogPostContainer.className = 'blogPostContainer';

      // Create BlogPostElement (Container fot the blogPost)
      const blogPost = document.createElement('div');
      blogPost.className = 'blogPost';

      // Create HeadeContainer (Holds Header and Banner/MainImg/Geostatus)
      const blogPostHeaderContainer = document.createElement('div');
      blogPostHeaderContainer.className = 'blogPostHeaderContainer';

      // Create BlogPostTitle and add it to HeaderContainer
      const blogPostHeader = document.createElement('h2');
      blogPostHeader.className = 'blogPostHeader';

      const blogPostmedia = document.createElement('img');
      blogPostmedia.className = 'blogPostmedia';

      const blogPostText = document.createElement('p');
      blogPostText.className = 'blogPostText';

      // Create BlogPost MetaContainer (Avatar, Author, Created )
      const metaContainer = document.createElement('div');
      metaContainer.className = 'metaContainer';

      const avatar = document.createElement('img');
      avatar.className = 'avatar';

      const authorLabel = document.createElement('p');
      const createdLabel = document.createElement('p');
      authorLabel.className = 'label';
      createdLabel.className = 'label';

      // add Meta to  Container like Avatar/Author usw
      metaContainer.appendChild(avatar);
      metaContainer.appendChild(authorLabel);
      metaContainer.appendChild(createdLabel);

      // Add Title and Banner to Header (Geo or img)
      blogPostHeaderContainer.appendChild(blogPostmedia);
      blogPostHeaderContainer.appendChild(blogPostHeader);

      // add Header and Content to BlogPost
      blogPost.appendChild(blogPostHeaderContainer);
      blogPost.appendChild(blogPostText);

      // add BlogPost and its Meta to BlogPostContainer
      blogPostContainer.appendChild(blogPost);
      blogPostContainer.appendChild(metaContainer);
      // add BlogPostContainer to the bloggingContauner
      bloggingContainer.appendChild(blogPostContainer);
    });
  }
}
const blogservice = new Blogservice();
console.log('TestData:', blogservice.testData);
