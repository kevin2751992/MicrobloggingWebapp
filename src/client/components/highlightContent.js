export class HighlightContent {
  constructor (content) {
    this.contentArray = content;
    this.index = 0;
  }

  initView () {
    const highlightContainer = document.getElementById('highlightContainer');
    const headerContainer = document.createElement('div');
    const header = document.createElement('h2');
    header.className = 'header';
    header.innerText = 'Our Highlights';
    headerContainer.appendChild(header);
    headerContainer.className = 'headerContainer';
    highlightContainer.appendChild(headerContainer);
    const mainInnerContainer = document.createElement('div');
    mainInnerContainer.className = 'mainInnerContainer';

    this.contentArray.forEach((item, index) => {
      // Create BlogPostElement (Container fot the blogPost)

      const highlightedBlogPost = document.createElement('div');
      highlightedBlogPost.className = 'highlightedBlogPost';
      if (index === 1) {
        highlightedBlogPost.classList.add('show');
      } else {
        highlightedBlogPost.classList.add('hide');
      }
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

      // add BlogPost and its Meta to highlightedBlogPost
      highlightedBlogPost.appendChild(metaContainer);
      if (item.content.img) {
        const blogPostimg = document.createElement('img');
        blogPostimg.className = 'blogPostmedia';
        blogPostimg.src = item.content.img;
        highlightedBlogPost.appendChild(blogPostimg);
      }
      if (item.geolocation && item.geolocation.longitude !== '' && item.geolocation.latitude !== '') {
        const map = new Map(item.geolocation.longitude, item.geolocation.latitude).createMap();
        highlightedBlogPost.appendChild(map);
      }
      /* const nextButton = document.createElement('button');
      const nextIcon = document.createElement('span');
      nextIcon.className = 'glyphicon glyphicon-chevron-right';
      nextButton.appendChild(nextIcon);
      const prevButton = document.createElement('button');
      const prevIcon = document.createElement('span');
      prevIcon.className = 'glyphicon glyphicon-chevron-left';
      prevButton.appendChild(prevIcon); */
      highlightedBlogPost.appendChild(blogPost);
      mainInnerContainer.appendChild(highlightedBlogPost);

      // mainInnerContainer.appendChild(nextButton);
      // mainInnerContainer.appendChild(prevButton);
      highlightContainer.appendChild(mainInnerContainer);
    });
    const dotContainer = document.createElement('div');
    dotContainer.className = 'dotContainer';
    this.contentArray.forEach(content => {
      const dot = document.createElement('span');
      dot.className = 'dot';
      dotContainer.appendChild(dot);
    });
    mainInnerContainer.appendChild(dotContainer);
  }

  carousel () {
    const highlightedContent = document.getElementsByClassName('highlightedBlogPost');

    for (let i = 0; i < highlightedContent.length; i++) {
      highlightedContent[i].classList.remove('show');
      highlightedContent[i].classList.add('hide');
    }
    this.index++;
    if (this.index > highlightedContent.length) {
      this.index = 1;
    }

    highlightedContent[this.index - 1].classList.remove('hide');
    highlightedContent[this.index - 1].classList.add('show');

    const dots = document.getElementsByClassName('dot');
    if (this.index === 1) {
      dots[dots.length - 1].classList.remove('active');
    } else {
      dots[this.index - 2].classList.remove('active');
    }
    dots[this.index - 1].classList.add('active');
    setTimeout(this.carousel.bind(this), 15000);
  }
}
