
export class Pagination {
  constructor (numberOfBlogPosts) {
    console.log('Amount of BlogPosts: ', numberOfBlogPosts);
    this.numberOfBlogPosts = numberOfBlogPosts;
    this.maxPageNumber = Math.ceil(this.numberOfBlogPosts / 10);
    this.index = 1;

    this.nextPageHandler = (event) => {
      console.log('current Index', this.index);
      if (this.index < this.maxPageNumber) {
        const paginationlinks = document.getElementById('indexContainer').children;
        const currentIndex = paginationlinks[this.index];
        currentIndex.classList.remove('active');

        this.index++;
        console.log('next Index', this.index);
        console.log('next IndexElemnt', currentIndex);
        const nextIndex = paginationlinks[this.index];
        nextIndex.className = 'active';
      }

      const paginationlinks = document.getElementById('indexContainer').children;
      // first and last Element is next and prev icon!!

      console.log('links', paginationlinks);
    };
    this.prevPageHandler = function (event) {
      this.index--;
      const paginationlinks = document.getElementById('indexContainer').children;
      console.log('links', paginationlinks);
    };
  }

  createPagination () {
    // get max Page and round it up

    const paginationContainer = document.getElementById('paginationContainer');
    const indexContainer = document.createElement('div');
    indexContainer.className = 'indexContainer';
    indexContainer.setAttribute('id', 'indexContainer');
    const prevpage = document.createElement('span');
    prevpage.className = 'glyphicon glyphicon-menu-left';
    prevpage.addEventListener('click', this.prevPageHandler);
    indexContainer.appendChild(prevpage);

    // add here pagination for 100+ blogentries
    for (let i = 1; i <= this.maxPageNumber; i++) {
      const paginationlink = document.createElement('a');
      paginationlink.innerHTML = i;
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
}
