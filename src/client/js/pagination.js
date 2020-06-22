
export class Pagination {
  constructor (numberOfBlogPosts) {
    console.log('Amount of BlogPosts: ', numberOfBlogPosts);
    this.numberOfBlogPosts = numberOfBlogPosts;
    this.index = 0;
  }

  createPagination () {
    // get max Page and round it up
    const maxPageNumber = Math.ceil(this.numberOfBlogPosts / 10);
    const paginationContainer = document.getElementById('paginationContainer');
    const indexContainer = document.createElement('div');
    indexContainer.className = 'indexContainer';
    indexContainer.setAttribute('id', 'indexContainer');

    // add here pagination for 100+ blogentries
    for (let i = 1; i <= maxPageNumber; i++) {
      const paginationlink = document.createElement('a');
      paginationlink.innerHTML = i;
      if (i === 1) {
        console.log('active');
        paginationlink.className = 'active';
      }
      indexContainer.appendChild(paginationlink);
    }
    paginationContainer.appendChild(indexContainer);
  }

  nextPage () {
    this.index++;
    const paginationlinks = document.getElementById('indexContainer').children;
    console.log('links', paginationlinks);
  }

  prevPage () {
    this.index--;
  }
}
