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
    this.blogPostsArray.forEach((item, index) => {
      // Create BlogPostDiv and add its css class to it
      const blogPostContainer = document.createElement('div');
      blogPostContainer.className = 'blogPostContainer';
      if (index > 10) {
        blogPostContainer.classList.add('hidden');
      } else {
        blogPostContainer.classList.add('show');
      }

      // Create BlogPostElement (Container fot the blogPost)
      const blogPost = document.createElement('div');
      blogPost.className = 'blogPost';
      // Create HeadeContainer (Holds Header and Banner/MainImg/Geostatus)
      const blogPostHeaderContainer = document.createElement('div');
      blogPostHeaderContainer.className = 'blogPostHeaderContainer';

      // Create BlogPostTitle and add it to HeaderContainer
      const blogPostHeader = document.createElement('h2');
      blogPostHeader.className = 'blogPostHeader';
      blogPostHeader.innerHTML = item.content.title;

      const blogPostimg = document.createElement('img');
      blogPostimg.className = 'blogPostmedia';
      blogPostimg.src = item.content.img;

      const blogPostText = document.createElement('p');
      blogPostText.className = 'blogPostText';
      blogPostText.innerHTML = item.content.text;

      // Create BlogPost MetaContainer (Avatar, Author, Created )
      const metaContainer = document.createElement('div');
      metaContainer.className = 'metaContainer';

      const avatar = document.createElement('img');
      avatar.className = 'avatar';
      avatar.src = item.author.avatarUrl;

      const metaHeaderContainer = document.createElement('div');
      metaHeaderContainer.className = 'metaHeaderContainer';

      const authorLabel = document.createElement('p');
      authorLabel.innerHTML = item.author.name;
      const createdLabel = document.createElement('p');
      createdLabel.innerHTML = item.meta.created;
      authorLabel.className = 'label';
      createdLabel.className = 'label';

      // add Meta to  Container like Avatar/Author usw
      metaContainer.appendChild(avatar);
      metaHeaderContainer.appendChild(authorLabel);
      metaHeaderContainer.appendChild(createdLabel);
      metaContainer.appendChild(metaHeaderContainer);

      // Add Title and Banner to Header (Geo or img)
      blogPostHeaderContainer.appendChild(blogPostHeader);

      // add Header and Content to BlogPost
      blogPost.appendChild(blogPostHeaderContainer);
      blogPost.appendChild(blogPostText);

      // add BlogPost and its Meta to BlogPostContainer
      blogPostContainer.appendChild(metaContainer);
      blogPostContainer.appendChild(blogPostimg);
      blogPostContainer.appendChild(blogPost);

      // add BlogPostContainer to the bloggingContauner
      bloggingContainer.appendChild(blogPostContainer);
    });
  }
}
