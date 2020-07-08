
// import { Modal } from './components/Modal';
import { Map } from './map';
export class BlogPosts {
  constructor (blogPosts) {
    this.blogPostsArray = blogPosts;
    console.log('TestData', this.blogPostsArray);
  }

  createBlogPosts () {
    // get BlogPostContainer from document by its id

    // Create for each BlogPost a BlogPostElement and append it to the container
    this.blogPostsArray.forEach((item, index) => {
      // Create BlogPostDiv and add its css class to it
      const blogPostContainer = document.createElement('div');
      blogPostContainer.className = 'blogPostContainer';
      this.createSingleBlogPost(item, index, false);
    });
  }

  createSingleBlogPost (item, index, addPost) {
    const bloggingContainer = document.getElementById('bloggingContainer');
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
    blogPostHeader.innerHTML = item.content.title;

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
    if (item.content.img) {
      const blogPostimg = document.createElement('img');
      blogPostimg.className = 'blogPostmedia';
      blogPostimg.src = item.content.img;
      blogPostContainer.appendChild(blogPostimg);
    }
    if (item.geolocation && item.geolocation.longitude !== '' && item.geolocation.latitude !== '') {
      const map = new Map(item.geolocation.longitude, item.geolocation.latitude).createMap();
      blogPostContainer.appendChild(map);
    }

    blogPostContainer.appendChild(blogPost);

    // add BlogPostContainer to the bloggingContauner
    // bloggingContainer.appendChild(blogPostContainer);
    if (blogPostContainer.children.length > 0) {
      // bloggingContainer.insert(blogPostContainer);
      // console.log('add ned blogPost', addPost);
      // console.log('index', index);
      // console.log('item', item);
      // Check if we add a Post after the site was already created,
      if (addPost) {
        // if we add something insert it before the first current Post, so it appears on Top as the newest Post
        bloggingContainer.insertBefore(blogPostContainer, bloggingContainer.children[0]);
        // Since we have now 11 Post hide the last one so we have 10 in total again
        bloggingContainer.children[10].classList.remove('show');
        bloggingContainer.children[10].classList.add('hide');
      } else {
        // If we building up the site and its posts
        bloggingContainer.appendChild(blogPostContainer);
      }
    }
    // hide all after the first ten posts
    if (index > 9) {
      blogPostContainer.classList.add('hidden');
    } else {
      blogPostContainer.classList.add('show');
    }
  }
}
