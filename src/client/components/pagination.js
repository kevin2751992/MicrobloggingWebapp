
export class Pagination {
  constructor (numberOfBlogPosts) {
    console.log('Amount of BlogPosts: ', numberOfBlogPosts);
    this.numberOfBlogPosts = numberOfBlogPosts;
    // Math.ceil round up -->33/10=4
    this.maxPageNumber = Math.ceil(this.numberOfBlogPosts / 10);
    // index 1 (first and last item in index container is the previcon/nexticon so we start at index 1)
    this.index = 1;
    this.blogposts = document.getElementById('bloggingContainer').children;

    this.nextPageHandler = (event) => {
      console.log('current Index', this.index);
      // If we havent reached the last page then
      if (this.index < this.maxPageNumber) {
        // Get Elements of indexContainer
        const paginationlinks = document.getElementById('indexContainer').children;

        // current index isnt active anymore
        const currentIndex = paginationlinks[this.index];
        currentIndex.classList.remove('active');
        // Get the next Index and set it active
        this.index++;
        console.log('next Index', this.index);
        console.log('next IndexElemnt', currentIndex);
        const nextIndex = paginationlinks[this.index];
        nextIndex.className = 'active';
        // if we now reached the last page disable the nexticon

        // set start and endponts to flag which post to show and which to hide
        const startshow = ((this.index - 1) * 10) + 1;
        let endshow = startshow + 9;
        const endhidden = (this.index - 1) * 10;
        const starthidden = endhidden - 9;
        if (this.index === this.maxPageNumber) {
          const nextIcon = paginationlinks[paginationlinks.length - 1];
          nextIcon.classList.add('disabled');
          // if we reached the lastpage then set the endpoint to the last elemnt so we dont get outofbounce
          endshow = this.blogposts.length;
        }
        this.updateBlogPost(starthidden, endhidden, startshow, endshow);
        // if we not on the startpage enable the previcon
        if (this.index > 1) {
          const nextIcon = paginationlinks[0];
          nextIcon.classList.remove('disabled');
        }
      }
    };
    this.prevPageHandler = (event) => {
      console.log('current Index', this.index);
      // If we are not on the startpage then
      if (this.index > 1) {
        // get indexContainer and its children
        // first and last Element is next and prev icon!!
        const paginationlinks = document.getElementById('indexContainer').children;
        // remove active from current index
        const currentIndex = paginationlinks[this.index];
        currentIndex.classList.remove('active');

        // get prev index and set it active
        this.index--;

        const startshow = ((this.index - 1) * 10) + 1;
        let endshow = startshow + 9;
        const starthidden = ((this.index) * 10) + 1;
        const endhidden = starthidden + 9;

        if (endshow > this.blogposts.length) {
          endshow = this.blogposts.length;
        }
        this.updateBlogPost(starthidden, endhidden, startshow, endshow);

        console.log('prev Index', this.index);
        console.log('prev IndexElemnt', currentIndex);
        const nextIndex = paginationlinks[this.index];
        nextIndex.className = 'active';

        // if we reached startpage
        if (this.index === 1) {
          const nextIcon = paginationlinks[0];
          nextIcon.classList.add('disabled');
        }
        // if we arent on last page
        if (this.index < this.maxPageNumber) {
          const nextIcon = paginationlinks[paginationlinks.length - 1];
          nextIcon.classList.remove('disabled');
        }
      }
    };
  }

  createPagination () {
    // ----Create Pagination Container and its Elements
    const paginationContainer = document.getElementById('paginationContainer');
    const indexContainer = document.createElement('div');
    indexContainer.className = 'indexContainer';
    indexContainer.setAttribute('id', 'indexContainer');
    const prevpage = document.createElement('span');
    prevpage.className = 'glyphicon glyphicon-menu-left';
    prevpage.classList.add('disabled');
    prevpage.addEventListener('click', this.prevPageHandler);
    indexContainer.appendChild(prevpage);

    // add here pagination for 100+ blogentries

    // Create for each page a index
    for (let i = 1; i <= this.maxPageNumber; i++) {
      const paginationlink = document.createElement('a');
      paginationlink.innerHTML = i;
      // init first index as active
      if (i === 1) {
        console.log('active');
        paginationlink.className = 'active';
      }
      indexContainer.appendChild(paginationlink);
    }
    const nextpage = document.createElement('span');
    nextpage.className = 'glyphicon glyphicon-menu-right';
    nextpage.addEventListener('click', this.nextPageHandler);
    indexContainer.appendChild(nextpage);
    paginationContainer.appendChild(indexContainer);
  }

  updateBlogPost (hideStart, hideEnd, showStart, showEnd) {
    console.log('blogpost to hide:', hideStart + ' bis', hideEnd);
    console.log('blogpost to show:', showStart + ' bis', showEnd);
    const blogPostsHTMlCol = document.getElementById('bloggingContainer').children;
    const blogPostArr = Array.prototype.slice.call(blogPostsHTMlCol);
    const blogPostsToHide = blogPostArr.slice(hideStart - 1, hideEnd);
    blogPostsToHide.forEach(postToHide => {
      postToHide.classList.remove('show');
      postToHide.classList.add('hidden');
    });
    const blogPostsToShow = blogPostArr.slice(showStart - 1, showEnd);
    blogPostsToShow.forEach(postToShow => {
      postToShow.classList.remove('hidden');
      postToShow.classList.add('show');
    });
    console.log('posts to hide', blogPostsToHide);

    console.log('posts to show', blogPostsToShow);
  }
}