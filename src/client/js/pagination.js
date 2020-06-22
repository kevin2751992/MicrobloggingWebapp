
export class Pagination {
  constructor (numberOfBlogPosts) {
    console.log('Amount of BlogPosts: ', numberOfBlogPosts);
    this.numberOfBlogPosts = numberOfBlogPosts;
    // Math.ceil round up -->33/10=4
    this.maxPageNumber = Math.ceil(this.numberOfBlogPosts / 10);
    // index 1 (first item in index container is the previcon so we start at index 1)
    this.index = 1;

    this.nextPageHandler = (event) => {
      console.log('current Index', this.index);
      // If we havent reached the last page then
      if (this.index < this.maxPageNumber) {
        // Get Elements of indexContainer
        // first and last Element is next and prev icon!!
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
        if (this.index === this.maxPageNumber) {
          const nextIcon = paginationlinks[paginationlinks.length - 1];
          nextIcon.classList.add('disabled');
        }
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
    // get max Page and round it up

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
