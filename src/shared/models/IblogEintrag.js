class BlogEntry {
  constructor (title, author, body) {
    this.title = title;
    this.author = author;
    this.body = body;
  }
}

var blogEintrag = new BlogEntry('Titel', 'Author', 'Body');
console.log(blogEintrag);
