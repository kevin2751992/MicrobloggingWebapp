export class HighlightContent {
  constructor (content) {
    this.contentArray = content;
  }

  initView () {
    console.log('highlight', this.contentArray);
    console.log('is called');
    const highlightContainer = document.getElementById('highlightContainer');
    const headerContainer = document.createElement('div');
    const header = document.createElement('h2');
    header.className = 'header';
    header.innerText = 'Unsere Highlights';
    headerContainer.appendChild(header);
    headerContainer.className = 'headerContainer';
    highlightContainer.appendChild(headerContainer);
    const mainInnerContainer = document.createElement('div');
    mainInnerContainer.className = 'mainInnerContainer';

    this.contentArray.forEach(item => {
      // Create BlogPostElement (Container fot the blogPost)
      const blogPostContainer = document.createElement('div');
      blogPostContainer.className = 'blogPostContainer';
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
        console.log('create maps');
        const map = new Map(item.geolocation.longitude, item.geolocation.latitude).createMap();
        blogPostContainer.appendChild(map);
      }

      blogPostContainer.appendChild(blogPost);
      mainInnerContainer.appendChild(blogPostContainer);
      highlightContainer.appendChild(mainInnerContainer);
    });
  }
}
