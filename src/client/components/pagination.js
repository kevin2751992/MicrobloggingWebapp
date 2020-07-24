// var L = require('leaflet');
export class Pagination {
  constructor (numberOfBlogPosts, maps) {
    // console.log('Amount of BlogPosts: ', numberOfBlogPosts);
    this.numberOfBlogPosts = numberOfBlogPosts;
    this.maps = maps;
    console.log('maps in pagination', this.maps);
    // Math.ceil round up -->33/10=4
    this.maxPageNumber = Math.ceil(this.numberOfBlogPosts / 10);
    // index 1 (first and last item in index container is the previcon/nexticon so we start at index 1)
    this.index = 1;
    this.blogposts = document.getElementById('bloggingContainer').children;

    this.getIndexHander = (event) => {
      const clickedIndex = event.target.innerHTML;
      this.getPage(clickedIndex);
    };

    this.nextPageHandler = (event) => {
      // console.log('current Index', this.index);
      // If we havent reached the last page then
      if (this.index < this.maxPageNumber) {
        // Get Elements of indexContainer
        const paginationlinks = document.getElementById('indexContainer').children;

        // current index isnt active anymore
        const currentIndex = paginationlinks[this.index];
        currentIndex.classList.remove('active');
        // Get the next Index and set it active
        this.index++;
        // console.log('next Index', this.index);
        // console.log('next IndexElemnt', currentIndex);
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
      // console.log('current Index', this.index);
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

        // console.log('prev Index', this.index);
        // console.log('prev IndexElemnt', currentIndex);
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
      paginationlink.addEventListener('click', this.getIndexHander);
      paginationlink.innerHTML = i;
      // init first index as active
      if (i === 1) {
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

  getPage (clickedIndex) {
    // Example clicked index 2. Blogpost to show 11-20.  startshow=(2-1)*10+1=11, endShow=11+9=20
    const startshow = ((clickedIndex - 1) * 10) + 1;
    let endshow = startshow + 9;
    const endhidden = (this.index) * 10;
    const starthidden = endhidden - 9;

    // Set new Index to active, and remove the active from the prev activ icon
    const paginationlinks = document.getElementById('indexContainer').children;
    // et current Index and set it active
    const activeIcon = paginationlinks[clickedIndex];
    activeIcon.classList.add('active');
    // if a new index was selected get previndex via this.index and set in to inactive
    if (parseInt(clickedIndex) !== this.index) {
      const prevActiveIcon = paginationlinks[this.index];
      prevActiveIcon.classList.remove('active');
    }
    // if the clicked index is not the first page, then enable the prevButtonIcon
    if (parseInt(clickedIndex) > 1) {
      const prevIcon = paginationlinks[0];
      prevIcon.classList.remove('disabled');
      // enable also the nextIcon
      const nextIcon = paginationlinks[paginationlinks.length - 1];
      nextIcon.classList.remove('disabled');
    }
    // clicked index= firstpage then disable previcon and enable next
    if (parseInt(clickedIndex) === 1) {
      const prevIcon = paginationlinks[0];
      prevIcon.classList.add('disabled');
      const nextIcon = paginationlinks[paginationlinks.length - 1];
      nextIcon.classList.remove('disabled');
    }
    // last but not least check if the clicked index is the last page. disable next
    if (parseInt(clickedIndex) === this.maxPageNumber) {
      const nextIcon = paginationlinks[paginationlinks.length - 1];
      nextIcon.classList.add('disabled');

      // if we reached the lastpage then set the endpoint to the last elemnt so we dont get outofbounce
      endshow = this.blogposts.length;
    }
    this.updateBlogPost(starthidden, endhidden, startshow, endshow);
    // This is a known and well-documented issue with Leaflet. If the map container div doesn't have a defined size at the point that the map initialises, the tiles don't load.
    // after the map is initilized we have to inform it that we changed the size of the container.
    // Since we use Css to show or hide posts we ran in thats issue also when we change a page. We need to track our maps and inform them when we change the page.
    /* this.maps.forEach(map => {
      console.log('map', map);
      map.invalidateSize();
    }); */
    // set this index to clicked index
    this.index = clickedIndex;
  }

  updateBlogPost (hideStart, hideEnd, showStart, showEnd) {
    // console.log('blogpost to hide:', hideStart + ' bis', hideEnd);
    // console.log('blogpost to show:', showStart + ' bis', showEnd);
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
  }
}
